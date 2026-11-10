import { Problem } from "../problems/__data__/Problems";

const QUEUE_KEY = "revisitQueue";
const LAST_KEY = "lastOpenedProblem";

const read = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const getQueue = (): Problem[] => read<Problem[]>(QUEUE_KEY, []);

const saveQueue = (queue: Problem[]) =>
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));

export const getLastOpened = (): Problem | null =>
  read<Problem | null>(LAST_KEY, null);

export const setLastOpened = (problem: Problem) =>
  localStorage.setItem(LAST_KEY, JSON.stringify(problem));

export const clearLastOpened = () => localStorage.removeItem(LAST_KEY);

export const addToQueue = (problem: Problem): Problem[] => {
  const queue = getQueue();
  if (!queue.some((p) => p.leetcode === problem.leetcode)) {
    queue.push(problem);
    saveQueue(queue);
  }
  return queue;
};

export const removeFromQueue = (problem: Problem): Problem[] => {
  const queue = getQueue().filter((p) => p.leetcode !== problem.leetcode);
  saveQueue(queue);
  return queue;
};

export const pickFromQueue = (queue: Problem[]): Problem | undefined =>
  queue[Math.floor(Math.random() * queue.length)];

export const problemName = (problem: Problem): string => {
  const slug = problem.leetcode.match(/\/problems\/([^/]+)/)?.[1] ?? "";
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};
