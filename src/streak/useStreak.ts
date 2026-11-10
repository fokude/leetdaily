import { useEffect, useState } from "react";
import { today } from "../progress/records";
import { storageGet, storageSet } from "../storage/storage";
import {
  EMPTY_STREAK,
  Streak,
  activeStreak,
  doneToday,
  recordActivity,
} from "./streak";

const KEY = "streak";

const loadStreak = async (): Promise<Streak> =>
  (await storageGet<Streak>([KEY]))[KEY] ?? EMPTY_STREAK;

export const useStreak = () => {
  const [streak, setStreak] = useState<Streak>(EMPTY_STREAK);

  useEffect(() => {
    const load = () => loadStreak().then(setStreak);
    load();
    if (typeof chrome === "undefined" || !chrome.storage?.onChanged) return;
    const listener = (changes: Record<string, unknown>, area: string) => {
      if (area === "sync" && KEY in changes) load();
    };
    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  /** Count a rated attempt today. Reads storage first so it never overwrites newer data. */
  const record = async () => {
    const next = recordActivity(await loadStreak(), today());
    setStreak(next);
    await storageSet({ [KEY]: next });
  };

  const day = today();
  return {
    days: activeStreak(streak, day),
    best: streak.best,
    doneToday: doneToday(streak, day),
    record,
  };
};
