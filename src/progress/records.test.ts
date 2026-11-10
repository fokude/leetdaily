import { describe, expect, test } from "vitest";
import {
  applyRating,
  dueSlugs,
  INTERVALS,
  markForRevisit,
  queuedSlugs,
} from "./records";

describe("applyRating", () => {
  test("nailed on a fresh problem marks it solved and does not queue it", () => {
    expect(applyRating(undefined, "nailed", 100)).toEqual({
      solved: true,
      box: 0,
      last: 100,
      due: 0,
    });
  });

  test("shaky on a fresh problem queues it for tomorrow", () => {
    expect(applyRating(undefined, "shaky", 100)).toEqual({
      solved: true,
      box: 1,
      last: 100,
      due: 101,
    });
  });

  test("missed on a fresh problem queues it and stays unsolved", () => {
    expect(applyRating(undefined, "missed", 100)).toEqual({
      solved: false,
      box: 1,
      last: 100,
      due: 101,
    });
  });

  test("nailed moves a queued problem up one box", () => {
    const queued = applyRating(undefined, "missed", 100);
    expect(applyRating(queued, "nailed", 101)).toEqual({
      solved: true,
      box: 2,
      last: 101,
      due: 101 + INTERVALS[1],
    });
  });

  test("nailed on the last box graduates the problem out of the queue", () => {
    const rec = { solved: true, box: INTERVALS.length, last: 1, due: 31 };
    expect(applyRating(rec, "nailed", 31)).toEqual({
      solved: true,
      box: 0,
      last: 31,
      due: 0,
    });
  });

  test("missed resets a deep box to the first box but keeps solved", () => {
    const rec = { solved: true, box: 4, last: 1, due: 15 };
    expect(applyRating(rec, "missed", 15)).toEqual({
      solved: true,
      box: 1,
      last: 15,
      due: 16,
    });
  });

  test("shaky repeats the current box", () => {
    const rec = { solved: true, box: 3, last: 1, due: 8 };
    expect(applyRating(rec, "shaky", 8)).toMatchObject({
      box: 3,
      due: 8 + INTERVALS[2],
    });
  });
});

describe("queues", () => {
  const map = {
    later: { solved: true, box: 2, last: 1, due: 20 },
    overdue: { solved: false, box: 1, last: 1, due: 5 },
    today: { solved: true, box: 1, last: 1, due: 10 },
    idle: { solved: true, box: 0, last: 1, due: 0 },
  };

  test("queuedSlugs lists queued problems, most overdue first", () => {
    expect(queuedSlugs(map)).toEqual(["overdue", "today", "later"]);
  });

  test("dueSlugs only includes problems due on or before today", () => {
    expect(dueSlugs(map, 10)).toEqual(["overdue", "today"]);
  });

  test("markForRevisit queues without changing the last attempt", () => {
    expect(
      markForRevisit({ solved: true, box: 0, last: 7, due: 0 }, 50),
    ).toEqual({ solved: true, box: 1, last: 7, due: 51 });
  });
});
