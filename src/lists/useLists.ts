import { useCallback, useEffect, useState } from "react";
import { BUILT_IN_LISTS, ProblemList } from "./builtin";
import {
  deleteCustomList,
  isListKey,
  loadCustomLists,
  replaceCustomLists,
  saveCustomList,
} from "./customStore";

export const useLists = () => {
  const [custom, setCustom] = useState<ProblemList[]>([]);

  const reload = useCallback(
    async () => setCustom(await loadCustomLists()),
    [],
  );

  useEffect(() => {
    reload();
    if (typeof chrome === "undefined" || !chrome.storage?.onChanged) return;
    const listener = (changes: Record<string, unknown>, area: string) => {
      if (area === "sync" && Object.keys(changes).some(isListKey)) reload();
    };
    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, [reload]);

  const addList = async (name: string, slugs: string[]): Promise<string> => {
    const id = `c${Date.now().toString(36)}`;
    await saveCustomList({ id, name, slugs, builtIn: false });
    await reload();
    return id;
  };

  const removeList = async (id: string) => {
    await deleteCustomList(id);
    await reload();
  };

  const replaceCustom = async (lists: ProblemList[]) => {
    await replaceCustomLists(lists);
    await reload();
  };

  return {
    lists: [...BUILT_IN_LISTS, ...custom],
    custom,
    addList,
    removeList,
    replaceCustom,
  };
};
