import { describe, expect, test } from "vitest";
import chromeManifest from "../public/manifest.json";
import { GECKO_ID, toFirefoxManifest } from "./firefox-manifest.mjs";

const chrome = {
  manifest_version: 3,
  name: "Memoize",
  permissions: ["storage", "alarms"],
  background: { service_worker: "assets/background.js", type: "module" },
};

describe("toFirefoxManifest", () => {
  test("swaps the service worker for an event page script", () => {
    const { background } = toFirefoxManifest(chrome);
    expect(background).toEqual({
      scripts: ["assets/background.js"],
      type: "module",
    });
  });

  test("adds the gecko id that chrome.storage.sync needs", () => {
    const { browser_specific_settings: settings } = toFirefoxManifest(chrome);
    expect(settings.gecko.id).toBe(GECKO_ID);
    expect(settings.gecko.data_collection_permissions).toEqual({
      required: ["none"],
    });
  });

  test("the real manifest name fits Firefox's 45 character limit", () => {
    expect(toFirefoxManifest(chromeManifest).name.length).toBeLessThanOrEqual(
      45,
    );
  });

  test("keeps every other field and does not mutate the input", () => {
    const result = toFirefoxManifest(chrome);
    expect(result.permissions).toEqual(["storage", "alarms"]);
    expect(chrome.background.service_worker).toBe("assets/background.js");
    expect(chrome).not.toHaveProperty("browser_specific_settings");
  });
});
