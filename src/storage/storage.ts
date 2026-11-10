export type Area = "sync" | "local";

const PREFIX = "ld:";

// Uses chrome.storage when running as an extension, localStorage otherwise
// (tests, vite dev server).
const nativeArea = (area: Area) =>
  typeof chrome !== "undefined" ? chrome.storage?.[area] : undefined;

export const storageGet = async <T = unknown>(
  keys: string[],
  area: Area = "sync",
): Promise<Record<string, T>> => {
  const native = nativeArea(area);
  if (native) return (await native.get(keys)) as Record<string, T>;

  const out: Record<string, T> = {};
  for (const key of keys) {
    const raw = localStorage.getItem(`${PREFIX}${area}:${key}`);
    if (raw !== null) out[key] = JSON.parse(raw) as T;
  }
  return out;
};

export const storageSet = async (
  items: Record<string, unknown>,
  area: Area = "sync",
): Promise<void> => {
  const native = nativeArea(area);
  if (native) {
    await native.set(items);
    return;
  }
  for (const [key, value] of Object.entries(items)) {
    localStorage.setItem(`${PREFIX}${area}:${key}`, JSON.stringify(value));
  }
};

export const storageRemove = async (
  keys: string[],
  area: Area = "sync",
): Promise<void> => {
  const native = nativeArea(area);
  if (native) {
    await native.remove(keys);
    return;
  }
  for (const key of keys) localStorage.removeItem(`${PREFIX}${area}:${key}`);
};
