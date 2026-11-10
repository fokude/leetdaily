import { useCallback, useEffect, useRef, useState } from "react";
import { ProgressMap, ProgressRecord } from "./records";
import { isProgressKey, loadProgress, saveProgress } from "./store";

export type RecordUpdater = (
  rec: ProgressRecord | undefined,
) => ProgressRecord | undefined;

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<ProgressMap>({});

  const reload = useCallback(async () => {
    const map = await loadProgress();
    ref.current = map;
    setProgress(map);
    setLoaded(true);
  }, []);

  useEffect(() => {
    reload();
    // Pick up progress synced from another device.
    if (typeof chrome === "undefined" || !chrome.storage?.onChanged) return;
    const listener = (changes: Record<string, unknown>, area: string) => {
      if (area === "sync" && Object.keys(changes).some(isProgressKey)) reload();
    };
    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, [reload]);

  /** Apply an update to some slugs, return undefined from fn to delete one. */
  const update = useCallback((slugs: string[], fn: RecordUpdater) => {
    const next = { ...ref.current };
    for (const slug of slugs) {
      const rec = fn(next[slug]);
      if (rec) next[slug] = rec;
      else delete next[slug];
    }
    ref.current = next;
    setProgress(next);
    return saveProgress(next, slugs);
  }, []);

  return { progress, loaded, update };
};
