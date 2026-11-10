import { describe, expect, test } from "vitest";
import { parseListInput } from "./parseList";

describe("parseListInput", () => {
  test("accepts urls and slugs on separate lines and dedupes", () => {
    const { slugs, skipped } = parseListInput(
      [
        "https://leetcode.com/problems/two-sum/description/",
        "valid-anagram",
        "https://leetcode.com/problems/two-sum/",
      ].join("\n"),
    );
    expect(slugs).toEqual(["two-sum", "valid-anagram"]);
    expect(skipped).toEqual([]);
  });

  test("accepts comma separated values and JSON arrays", () => {
    expect(parseListInput("two-sum, 3sum").slugs).toEqual(["two-sum", "3sum"]);
    expect(parseListInput('["two-sum","lru-cache"]').slugs).toEqual([
      "two-sum",
      "lru-cache",
    ]);
  });

  test("skips titles with spaces instead of turning them into bad slugs", () => {
    const { slugs, skipped } = parseListInput("Two Sum\nlru-cache");
    expect(slugs).toEqual(["lru-cache"]);
    expect(skipped).toEqual(["Two Sum"]);
  });
});
