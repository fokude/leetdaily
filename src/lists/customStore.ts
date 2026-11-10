import { storageGet, storageRemove, storageSet } from "../storage/storage";
import { ProblemList } from "./builtin";

// chrome.storage.sync allows 8KB per item, so each list is its own item and
// is capped to what fits.
export const MAX_SLUGS = 200;

const IDS_KEY = "listIds";
const listKey = (id: string) => `list:${id}`;

interface Stored {
  name: string;
  slugs: string[];
}

export const isListKey = (key: string): boolean =>
  key === IDS_KEY || key.startsWith("list:");

const loadIds = async (): Promise<string[]> =>
  (await storageGet<string[]>([IDS_KEY]))[IDS_KEY] ?? [];

export const loadCustomLists = async (): Promise<ProblemList[]> => {
  const ids = await loadIds();
  const stored = await storageGet<Stored>(ids.map(listKey));
  return ids.flatMap((id) => {
    const s = stored[listKey(id)];
    return s ? [{ id, name: s.name, slugs: s.slugs, builtIn: false }] : [];
  });
};

export const saveCustomList = async (list: ProblemList): Promise<void> => {
  if (list.slugs.length > MAX_SLUGS) {
    throw new Error(`Lists can hold up to ${MAX_SLUGS} problems.`);
  }
  const ids = await loadIds();
  if (!ids.includes(list.id)) ids.push(list.id);
  await storageSet({
    [IDS_KEY]: ids,
    [listKey(list.id)]: { name: list.name, slugs: list.slugs },
  });
};

export const deleteCustomList = async (id: string): Promise<void> => {
  const ids = (await loadIds()).filter((i) => i !== id);
  await storageSet({ [IDS_KEY]: ids });
  await storageRemove([listKey(id)]);
};

/** Replace every custom list, e.g. when restoring a backup. */
export const replaceCustomLists = async (
  lists: ProblemList[],
): Promise<void> => {
  const oldIds = await loadIds();
  await storageRemove(oldIds.map(listKey));
  await storageSet({ [IDS_KEY]: [] });
  for (const list of lists) await saveCustomList(list);
};
