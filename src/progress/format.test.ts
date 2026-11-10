import { describe, expect, test } from "vitest";
import { dueLabel, lastLabel } from "./format";

const queued = (due: number) => ({ solved: false, box: 1, last: 1, due });

describe("dueLabel", () => {
  test("is empty when the problem is not in the queue", () => {
    expect(dueLabel(undefined, 10)).toBe("");
    expect(dueLabel({ solved: true, box: 0, last: 1, due: 0 }, 10)).toBe("");
  });

  test.each([
    [8, "Overdue 2d"],
    [10, "Due today"],
    [11, "Due tomorrow"],
    [15, "Due in 5d"],
  ])("due on day %i shows %s", (due, label) => {
    expect(dueLabel(queued(due), 10)).toBe(label);
  });
});

describe("lastLabel", () => {
  test("says Never when there is no attempt", () => {
    expect(lastLabel(undefined)).toBe("Never");
  });
});
