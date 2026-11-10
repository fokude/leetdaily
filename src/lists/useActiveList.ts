import { useEffect, useState } from "react";
import { storageGet, storageSet } from "../storage/storage";
import { ProblemList } from "./builtin";

const KEY = "activeList";

/**
 * The list the popup and dashboard both work on. Stored in sync storage so it
 * follows the user across devices. Falls back to the first list when the
 * stored one no longer exists (deleted, or custom lists still loading).
 */
export const useActiveList = (lists: ProblemList[]) => {
  const [storedId, setStoredId] = useState<string | null>(null);

  useEffect(() => {
    const load = () =>
      storageGet<string>([KEY]).then((res) => setStoredId(res[KEY] ?? null));
    load();
    if (typeof chrome === "undefined" || !chrome.storage?.onChanged) return;
    const listener = (changes: Record<string, unknown>, area: string) => {
      if (area === "sync" && KEY in changes) load();
    };
    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  const active = lists.find((l) => l.id === storedId) ?? lists[0];

  const setActiveId = (id: string) => {
    setStoredId(id);
    return storageSet({ [KEY]: id });
  };

  return { active, setActiveId };
};
