import { describe, expect, test } from "vitest";
import manifest from "../public/manifest.json";

describe("manifest", () => {
  // Only the daily challenge fetch needs network access, and it goes to
  // leetcode.com. Broad host permissions slow store review and worry users.
  test("host permissions are limited to leetcode.com", () => {
    expect(manifest.host_permissions).toEqual(["https://leetcode.com/*"]);
  });

  test("every declared icon size has a file", async () => {
    const { existsSync } = await import("node:fs");
    for (const path of Object.values(manifest.icons)) {
      expect(existsSync(`public/${path}`)).toBe(true);
    }
  });
});
