import { describe, expect, test } from "vitest";
import { BUILT_IN_LISTS } from "./builtin";

const byId = (id: string) => BUILT_IN_LISTS.find((l) => l.id === id)!;

describe("built-in lists", () => {
  test.each([
    ["neetcode150", 150],
    ["blind75", 75],
    ["grind169", 169],
  ])("%s has %i unique, well-formed slugs", (id, count) => {
    const { slugs } = byId(id);
    expect(slugs).toHaveLength(count);
    expect(new Set(slugs).size).toBe(count);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });
});
