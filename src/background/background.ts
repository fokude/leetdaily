import LeetcodeEndpoint from "../leetcode/LeetcodeEndpoint";
import { isProgressKey } from "../progress/store";
import { updateBadge } from "./badge";

const REFRESH_ALARM = "refreshBadge";

// Due dates roll over at midnight, so recheck hourly as well as on changes.
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create(REFRESH_ALARM, { periodInMinutes: 60 });
  updateBadge();
});
chrome.runtime.onStartup.addListener(updateBadge);
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === REFRESH_ALARM) updateBadge();
});
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && Object.keys(changes).some(isProgressKey)) {
    updateBadge();
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message === "getDailyChallenge") {
    (async () => {
      const leetcodeEndpoint = new LeetcodeEndpoint();
      const res = await leetcodeEndpoint.getDailyChallenge();
      const link = "https://leetcode.com" + res;
      sendResponse(link);
    })();
  }
  return true;
});
