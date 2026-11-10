import { describe, expect, test } from "vitest";
import { markForRevisit, markSolved, queuedSlugs } from "./records";

describe("records", () => {
  test("markForRevisit queues a problem for tomorrow without changing solved", () => {
    const rec = markForRevisit(undefined, 100);
    expect(rec).toEqual({ solved: false, box: 1, last: 100, due: 101 });
  });

  test("markSolved takes a problem out of the queue", () => {
    const rec = markSolved(markForRevisit(undefined, 100), 105);
    expect(rec).toEqual({ solved: true, box: 0, last: 105, due: 0 });
  });

  test("queuedSlugs returns most overdue first", () => {
    const map = {
      b: markForRevisit(undefined, 10),
      a: markForRevisit(undefined, 5),
      c: markSolved(undefined, 1),
    };
    expect(queuedSlugs(map)).toEqual(["a", "b"]);
  });
});
