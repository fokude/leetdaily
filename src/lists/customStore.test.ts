import { beforeEach, describe, expect, test } from "vitest";
import {
  MAX_SLUGS,
  deleteCustomList,
  loadCustomLists,
  replaceCustomLists,
  saveCustomList,
} from "./customStore";

const list = (id: string, slugs: string[]) => ({
  id,
  name: `List ${id}`,
  slugs,
  builtIn: false,
});

describe("custom list store", () => {
  beforeEach(() => localStorage.clear());

  test("saves, loads and deletes lists", async () => {
    await saveCustomList(list("a", ["two-sum"]));
    await saveCustomList(list("b", ["lru-cache"]));
    expect((await loadCustomLists()).map((l) => l.id)).toEqual(["a", "b"]);

    await deleteCustomList("a");
    expect((await loadCustomLists()).map((l) => l.id)).toEqual(["b"]);
  });

  test("refuses lists too big for a sync item", async () => {
    const slugs = Array.from({ length: MAX_SLUGS + 1 }, (_, i) => `p-${i}`);
    await expect(saveCustomList(list("big", slugs))).rejects.toThrow(
      "up to 200",
    );
  });

  test("replaceCustomLists swaps the whole set", async () => {
    await saveCustomList(list("a", ["two-sum"]));
    await replaceCustomLists([list("z", ["3sum"])]);
    expect(await loadCustomLists()).toEqual([list("z", ["3sum"])]);
  });
});
