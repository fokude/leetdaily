import { describe, expect, test } from "vitest";
import { parseBackup, serializeBackup } from "./backup";

const progress = { "two-sum": { solved: true, box: 2, last: 100, due: 103 } };
const lists = [{ id: "c1", name: "Mine", slugs: ["two-sum"], builtIn: false }];

describe("backup", () => {
  test("round-trips progress and custom lists", () => {
    expect(parseBackup(serializeBackup(progress, lists))).toEqual({
      progress,
      lists,
    });
  });

  test("a backup without lists still parses", () => {
    const old = JSON.stringify({ version: 1, progress });
    expect(parseBackup(old)).toEqual({ progress, lists: [] });
  });

  test("rejects files that are not backups", () => {
    expect(() => parseBackup('{"hello":1}')).toThrow(
      "Not a Spaced Complexity backup",
    );
  });

  test("rejects malformed records", () => {
    const bad = JSON.stringify({
      version: 1,
      progress: { "two-sum": { solved: "yes" } },
    });
    expect(() => parseBackup(bad)).toThrow("Bad entry");
  });

  test("rejects malformed lists", () => {
    const bad = JSON.stringify({
      version: 1,
      progress,
      lists: [{ id: "x", name: "Bad", slugs: ["Not A Slug"] }],
    });
    expect(() => parseBackup(bad)).toThrow("Bad custom list");
  });
});
