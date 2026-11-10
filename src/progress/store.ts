import { storageGet, storageRemove, storageSet } from "../storage/storage";
import { ProgressMap, ProgressRecord } from "./records";

// chrome.storage.sync allows 8KB per item and 512 items, so records are
// spread over a fixed number of chunks keyed by a hash of the slug.
export const CHUNKS = 16;
export const CHUNK_PREFIX = "p";

type Packed = [solved: 0 | 1, box: number, last: number, due: number];

const hash = (s: string): number => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
};

export const chunkKey = (slug: string): string =>
  `${CHUNK_PREFIX}${hash(slug) % CHUNKS}`;

const allChunkKeys = (): string[] =>
  Array.from({ length: CHUNKS }, (_, i) => `${CHUNK_PREFIX}${i}`);

const pack = (r: ProgressRecord): Packed => [
  r.solved ? 1 : 0,
  r.box,
  r.last,
  r.due,
];

const unpack = ([solved, box, last, due]: Packed): ProgressRecord => ({
  solved: solved === 1,
  box,
  last,
  due,
});

export const loadProgress = async (): Promise<ProgressMap> => {
  const chunks = await storageGet<Record<string, Packed>>(allChunkKeys());
  const map: ProgressMap = {};
  for (const chunk of Object.values(chunks)) {
    for (const [slug, packed] of Object.entries(chunk)) {
      map[slug] = unpack(packed);
    }
  }
  return map;
};

/** Rewrites only the chunks that contain one of the given slugs. */
export const saveProgress = async (
  map: ProgressMap,
  changed: string[],
): Promise<void> => {
  const keys = new Set(changed.map(chunkKey));
  const toSet: Record<string, Record<string, Packed>> = {};
  const toRemove: string[] = [];

  for (const key of keys) toSet[key] = {};
  for (const [slug, rec] of Object.entries(map)) {
    const key = chunkKey(slug);
    if (keys.has(key)) toSet[key][slug] = pack(rec);
  }
  for (const key of keys) {
    if (Object.keys(toSet[key]).length === 0) {
      delete toSet[key];
      toRemove.push(key);
    }
  }

  if (Object.keys(toSet).length) await storageSet(toSet);
  if (toRemove.length) await storageRemove(toRemove);
};

export const isProgressKey = (key: string): boolean =>
  key.startsWith(CHUNK_PREFIX) &&
  /^[0-9]+$/.test(key.slice(CHUNK_PREFIX.length));
