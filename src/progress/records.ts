export interface ProgressRecord {
  solved: boolean;
  /** 0 = not in revisit queue, 1+ = position in the review schedule */
  box: number;
  /** Day number (local days since epoch) of the last attempt */
  last: number;
  /** Day number the problem is next due for review */
  due: number;
}

export type ProgressMap = Record<string, ProgressRecord>;

/** Days until the next review at each box, Leitner style. */
export const INTERVALS = [1, 3, 7, 14, 30];

export type Rating = "nailed" | "shaky" | "missed";

export const today = (): number =>
  Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);

export const dayToDate = (day: number): Date =>
  new Date(day * 86400000 + new Date().getTimezoneOffset() * 60000);

const blank = (): ProgressRecord => ({
  solved: false,
  box: 0,
  last: 0,
  due: 0,
});

export const setSolved = (
  rec: ProgressRecord | undefined,
  solved: boolean,
): ProgressRecord => ({ ...(rec ?? blank()), solved });

/** Put a problem in the revisit queue without recording an attempt. */
export const markForRevisit = (
  rec: ProgressRecord | undefined,
  now: number,
): ProgressRecord => ({
  ...(rec ?? blank()),
  box: 1,
  due: now + INTERVALS[0],
});

export const removeFromQueue = (rec: ProgressRecord): ProgressRecord => ({
  ...rec,
  box: 0,
  due: 0,
});

/**
 * nailed: solved. Advances one box if queued, graduates after the last box.
 * shaky: solved but unsure. Queues it, or repeats the current box.
 * missed: back to the first box. Leaves the solved flag alone.
 */
export const applyRating = (
  rec: ProgressRecord | undefined,
  rating: Rating,
  now: number,
): ProgressRecord => {
  const r = rec ?? blank();
  const inBox = (box: number): ProgressRecord => ({
    ...r,
    box,
    last: now,
    due: now + INTERVALS[box - 1],
  });

  switch (rating) {
    case "nailed":
      if (r.box === 0) return { ...r, solved: true, last: now };
      if (r.box >= INTERVALS.length) {
        return { ...r, solved: true, box: 0, last: now, due: 0 };
      }
      return { ...inBox(r.box + 1), solved: true };
    case "shaky":
      return { ...inBox(r.box || 1), solved: true };
    case "missed":
      return inBox(1);
  }
};

/** Queued slugs, most overdue first */
export const queuedSlugs = (map: ProgressMap): string[] =>
  Object.keys(map)
    .filter((slug) => map[slug].box > 0)
    .sort((a, b) => map[a].due - map[b].due);

export const dueSlugs = (map: ProgressMap, now: number): string[] =>
  queuedSlugs(map).filter((slug) => map[slug].due <= now);
