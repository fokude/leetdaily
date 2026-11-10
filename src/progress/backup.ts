import { ProgressMap } from "./records";

export const serializeBackup = (progress: ProgressMap): string =>
  JSON.stringify({ version: 1, progress }, null, 2);

const isRecord = (v: unknown): boolean => {
  if (typeof v !== "object" || v === null) return false;
  const r = v as Record<string, unknown>;
  return (
    typeof r.solved === "boolean" &&
    Number.isInteger(r.box) &&
    Number.isInteger(r.last) &&
    Number.isInteger(r.due)
  );
};

/** Throws if the text is not a valid backup. */
export const parseBackup = (text: string): ProgressMap => {
  const data = JSON.parse(text);
  if (data?.version !== 1 || typeof data.progress !== "object") {
    throw new Error("Not a LeetDaily backup file");
  }
  for (const [slug, rec] of Object.entries(data.progress)) {
    if (!/^[a-z0-9-]+$/.test(slug) || !isRecord(rec)) {
      throw new Error(`Bad entry: ${slug}`);
    }
  }
  return data.progress as ProgressMap;
};
