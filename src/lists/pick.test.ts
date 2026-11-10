import { afterEach, describe, expect, test, vi } from "vitest";
import { Category } from "../problems/__data__/Problems";
import { BUILT_IN_LISTS, ProblemList } from "./builtin";
import { pickRandomSlug } from "./pick";

const custom: ProblemList = {
  id: "c1",
  name: "Mine",
  slugs: ["a", "b", "c"],
  builtIn: false,
};

describe("pickRandomSlug", () => {
  afterEach(() => vi.restoreAllMocks());

  test("picks from the given list", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    expect(pickRandomSlug(custom)).toBe("b");
  });

  test("ignores the category for lists other than NeetCode 150", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(pickRandomSlug(custom, Category.TREES)).toBe("a");
  });

  test("uses the category inside NeetCode 150", () => {
    const neetcode = BUILT_IN_LISTS[0];
    for (let i = 0; i < 20; i++) {
      const slug = pickRandomSlug(neetcode, Category.TRIES);
      expect([
        "implement-trie-prefix-tree",
        "design-add-and-search-words-data-structure",
        "word-search-ii",
      ]).toContain(slug);
    }
  });
});
