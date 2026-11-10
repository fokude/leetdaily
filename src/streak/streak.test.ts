import { describe, expect, test } from "vitest";
import {
  EMPTY_STREAK,
  activeStreak,
  doneToday,
  recordActivity,
} from "./streak";

describe("recordActivity", () => {
  test("first activity starts a streak of one", () => {
    expect(recordActivity(EMPTY_STREAK, 100)).toEqual({
      current: 1,
      best: 1,
      last: 100,
    });
  });

  test("several attempts on the same day count once", () => {
    const once = recordActivity(EMPTY_STREAK, 100);
    expect(recordActivity(once, 100)).toBe(once);
  });

  test("activity on consecutive days extends the streak and the best", () => {
    const day2 = recordActivity(recordActivity(EMPTY_STREAK, 100), 101);
    expect(day2).toEqual({ current: 2, best: 2, last: 101 });
  });

  test("a missed day restarts the streak but keeps the best", () => {
    const streak = { current: 5, best: 5, last: 100 };
    expect(recordActivity(streak, 102)).toEqual({
      current: 1,
      best: 5,
      last: 102,
    });
  });
});

describe("activeStreak", () => {
  const streak = { current: 4, best: 9, last: 100 };

  test("still counts today and the day after the last activity", () => {
    expect(activeStreak(streak, 100)).toBe(4);
    expect(activeStreak(streak, 101)).toBe(4);
  });

  test("is zero once a whole day has been missed", () => {
    expect(activeStreak(streak, 102)).toBe(0);
  });

  test("doneToday is only true on the day of the last activity", () => {
    expect(doneToday(streak, 100)).toBe(true);
    expect(doneToday(streak, 101)).toBe(false);
  });
});
