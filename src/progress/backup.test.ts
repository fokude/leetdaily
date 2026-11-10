import { describe, expect, test } from "vitest";
import { parseBackup, serializeBackup } from "./backup";

const map = { "two-sum": { solved: true, box: 2, last: 100, due: 103 } };

describe("backup", () => {
  test("round-trips progress", () => {
    expect(parseBackup(serializeBackup(map))).toEqual(map);
  });

  test("rejects files that are not backups", () => {
    expect(() => parseBackup('{"hello":1}')).toThrow("Not a LeetDaily backup");
  });

  test("rejects malformed records", () => {
    const bad = JSON.stringify({
      version: 1,
      progress: { "two-sum": { solved: "yes" } },
    });
    expect(() => parseBackup(bad)).toThrow("Bad entry");
  });
});
