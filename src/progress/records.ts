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

export const markSolved = (
  rec: ProgressRecord | undefined,
  now: number,
): ProgressRecord => ({
  ...(rec ?? blank()),
  solved: true,
  box: 0,
  last: now,
  due: 0,
});

export const markForRevisit = (
  rec: ProgressRecord | undefined,
  now: number,
): ProgressRecord => ({ ...(rec ?? blank()), box: 1, last: now, due: now + 1 });

/** Queued slugs, most overdue first */
export const queuedSlugs = (map: ProgressMap): string[] =>
  Object.keys(map)
    .filter((slug) => map[slug].box > 0)
    .sort((a, b) => map[a].due - map[b].due);
