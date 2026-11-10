import problems from "../problems/__data__/Problems";

export interface ProblemLink {
  slug: string;
  leetcode: string;
  neetcode?: string;
}

export const slugOf = (url: string): string =>
  url.match(/\/problems\/([^/?#]+)/)?.[1] ?? "";

const known = new Map<string, ProblemLink>();
for (const list of Object.values(problems)) {
  for (const p of list) {
    const slug = slugOf(p.leetcode);
    known.set(slug, { slug, leetcode: p.leetcode, neetcode: p.neetcode });
  }
}

export const problemFromSlug = (slug: string): ProblemLink =>
  known.get(slug) ?? {
    slug,
    leetcode: `https://leetcode.com/problems/${slug}/`,
  };

export const problemName = (slug: string): string =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
