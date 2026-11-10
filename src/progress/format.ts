import { ProgressRecord, dayToDate } from "./records";

export const dueLabel = (
  rec: ProgressRecord | undefined,
  now: number,
): string => {
  if (!rec || rec.box === 0) return "";
  const diff = rec.due - now;
  if (diff < 0) return `Overdue ${-diff}d`;
  if (diff === 0) return "Due today";
  if (diff === 1) return "Due tomorrow";
  return `Due in ${diff}d`;
};

export const lastLabel = (rec: ProgressRecord | undefined): string =>
  rec && rec.last > 0 ? dayToDate(rec.last).toLocaleDateString() : "Never";
