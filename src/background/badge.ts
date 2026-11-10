import { dueSlugs, today } from "../progress/records";
import { loadProgress } from "../progress/store";

export const badgeText = (count: number): string =>
  count === 0 ? "" : count > 99 ? "99+" : String(count);

export const updateBadge = async (): Promise<void> => {
  const due = dueSlugs(await loadProgress(), today());
  await chrome.action.setBadgeText({ text: badgeText(due.length) });
  await chrome.action.setBadgeBackgroundColor({ color: "#7c9473" });
};
