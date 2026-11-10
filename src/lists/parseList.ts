import { slugOf } from "./catalog";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * Accepts LeetCode URLs, bare slugs, or a JSON array of either, separated by
 * newlines or commas. Anything else (titles with spaces, junk) is returned
 * as skipped.
 */
export const parseListInput = (
  text: string,
): { slugs: string[]; skipped: string[] } => {
  const slugs: string[] = [];
  const skipped: string[] = [];

  for (const raw of text.split(/[\n,]+/)) {
    const part = raw.replace(/[[\]"']/g, "").trim();
    if (!part) continue;

    const slug = part.includes("/problems/")
      ? slugOf(part)
      : part.toLowerCase();

    if (!SLUG.test(slug)) skipped.push(part);
    else if (!slugs.includes(slug)) slugs.push(slug);
  }
  return { slugs, skipped };
};
