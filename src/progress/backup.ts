import { ProblemList } from "../lists/builtin";
import { ProgressMap } from "./records";

export interface Backup {
  progress: ProgressMap;
  lists: ProblemList[];
}

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export const serializeBackup = (
  progress: ProgressMap,
  customLists: ProblemList[] = [],
): string =>
  JSON.stringify(
    {
      version: 1,
      progress,
      lists: customLists.map(({ id, name, slugs }) => ({ id, name, slugs })),
    },
    null,
    2,
  );

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

const isList = (v: unknown): boolean => {
  if (typeof v !== "object" || v === null) return false;
  const l = v as Record<string, unknown>;
  return (
    typeof l.id === "string" &&
    typeof l.name === "string" &&
    Array.isArray(l.slugs) &&
    l.slugs.every((s) => typeof s === "string" && SLUG.test(s))
  );
};

/** Throws if the text is not a valid backup. */
export const parseBackup = (text: string): Backup => {
  const data = JSON.parse(text);
  if (data?.version !== 1 || typeof data.progress !== "object") {
    throw new Error("Not a Spaced Complexity backup file");
  }
  for (const [slug, rec] of Object.entries(data.progress)) {
    if (!SLUG.test(slug) || !isRecord(rec)) {
      throw new Error(`Bad entry: ${slug}`);
    }
  }
  const lists: unknown[] = data.lists ?? [];
  if (!Array.isArray(lists) || !lists.every(isList)) {
    throw new Error("Bad custom list in backup");
  }
  return {
    progress: data.progress as ProgressMap,
    lists: (lists as ProblemList[]).map(({ id, name, slugs }) => ({
      id,
      name,
      slugs,
      builtIn: false,
    })),
  };
};
