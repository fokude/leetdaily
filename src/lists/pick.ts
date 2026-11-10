import { Category } from "../problems/__data__/Problems";
import { ProblemEndpoint } from "../problems/ProblemEndpoint";
import { NEETCODE_150_ID, ProblemList } from "./builtin";
import { slugOf } from "./catalog";

/** Random slug from a list. Categories only exist for NeetCode 150. */
export const pickRandomSlug = (
  list: ProblemList,
  category: Category = Category.ALL,
): string => {
  if (list.id === NEETCODE_150_ID && category !== Category.ALL) {
    return slugOf(new ProblemEndpoint().getRandomProblem(category).leetcode);
  }
  return list.slugs[Math.floor(Math.random() * list.slugs.length)];
};
