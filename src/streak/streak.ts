export interface Streak {
  current: number;
  best: number;
  /** Day number (local days since epoch) of the last rated attempt */
  last: number;
}

export const EMPTY_STREAK: Streak = { current: 0, best: 0, last: 0 };

/** Counts a rated attempt on the given day. Several in one day count once. */
export const recordActivity = (streak: Streak, day: number): Streak => {
  if (streak.last === day) return streak;
  const current = streak.last === day - 1 ? streak.current + 1 : 1;
  return { current, best: Math.max(streak.best, current), last: day };
};

/** The streak as shown today: it is broken once a whole day has been missed. */
export const activeStreak = (streak: Streak, day: number): number =>
  streak.last >= day - 1 ? streak.current : 0;

export const doneToday = (streak: Streak, day: number): boolean =>
  streak.last === day;
