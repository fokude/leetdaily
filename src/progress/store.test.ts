import { beforeEach, describe, expect, test } from "vitest";
import { markForRevisit, markSolved } from "./records";
import { chunkKey, loadProgress, saveProgress } from "./store";

describe("progress store", () => {
  beforeEach(() => localStorage.clear());

  test("round-trips records through storage", async () => {
    const map = {
      "two-sum": markSolved(undefined, 10),
      "lru-cache": markForRevisit(undefined, 12),
    };
    await saveProgress(map, Object.keys(map));
    expect(await loadProgress()).toEqual(map);
  });

  test("deleting the last record in a chunk removes the chunk", async () => {
    await saveProgress({ "two-sum": markSolved(undefined, 10) }, ["two-sum"]);
    await saveProgress({}, ["two-sum"]);
    expect(await loadProgress()).toEqual({});
    expect(localStorage.getItem(`ld:sync:${chunkKey("two-sum")}`)).toBeNull();
  });

  test("a chunk stays well under the 8KB sync item limit for 150 problems", async () => {
    const map = Object.fromEntries(
      Array.from({ length: 150 }, (_, i) => [
        `some-long-problem-slug-${i}`,
        markForRevisit(undefined, 20000),
      ]),
    );
    await saveProgress(map, Object.keys(map));
    for (let i = 0; i < 16; i++) {
      const raw = localStorage.getItem(`ld:sync:p${i}`) ?? "";
      expect(raw.length).toBeLessThan(8192);
    }
  });
});
