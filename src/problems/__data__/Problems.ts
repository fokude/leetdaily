export interface Problem {
  leetcode: string;
  neetcode: string;
}

export enum Category {
  ALL = "all",
  ARRAYS = "arrays",
  STACKS = "stacks",
  BINARY_SEARCH = "binarySearch",
  SLIDING_WINDOW = "slidingWindow",
  TREES = "trees",
  TRIES = "tries",
  BACKTRACKING = "backtracking",
  HEAP_PRIORITYQ = "heap",
  GRAPHS = "graphs",
  ONE_D_DP = "oneDDP",
  INTERVALS = "intervals",
  GREEDY = "greedy",
  ADVANCED_GRAPHS = "advancedGraphs",
  TWO_D_DP = "twoDDP",
  BIT_MANIPULATION = "bitManipulation",
  MATH_GEOMETRY = "mathGeometry",
}

export const arrayProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/contains-duplicate/",
    neetcode: "https://neetcode.io/problems/duplicate-integer/question",
  },
  {
    leetcode: "https://leetcode.com/problems/valid-anagram/",
    neetcode: "https://neetcode.io/problems/is-anagram/question",
  },
  {
    leetcode: "https://leetcode.com/problems/two-sum/description/",
    neetcode: "https://neetcode.io/problems/two-integer-sum/question",
  },
  {
    leetcode: "https://leetcode.com/problems/group-anagrams/",
    neetcode: "https://neetcode.io/problems/anagram-groups/question",
  },
  {
    leetcode: "https://leetcode.com/problems/top-k-frequent-elements/",
    neetcode: "https://neetcode.io/problems/top-k-elements-in-list/question",
  },
  {
    leetcode: "https://leetcode.com/problems/encode-and-decode-strings/",
    neetcode: "https://neetcode.io/problems/string-encode-and-decode/question",
  },
  {
    leetcode: "https://leetcode.com/problems/product-of-array-except-self/",
    neetcode:
      "https://neetcode.io/problems/products-of-array-discluding-self/question",
  },
  {
    leetcode: "https://leetcode.com/problems/valid-sudoku/description/",
    neetcode: "https://neetcode.io/problems/valid-sudoku/question",
  },
  {
    leetcode: "https://leetcode.com/problems/longest-consecutive-sequence/",
    neetcode:
      "https://neetcode.io/problems/longest-consecutive-sequence/question",
  },
];
export const twoPointerProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/valid-palindrome/description/",
    neetcode: "https://neetcode.io/problems/is-palindrome/question",
  },
  {
    leetcode: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    neetcode: "https://neetcode.io/problems/two-integer-sum-ii/question",
  },
  {
    leetcode: "https://leetcode.com/problems/3sum/",
    neetcode: "https://neetcode.io/problems/three-integer-sum/question",
  },
  {
    leetcode: "https://leetcode.com/problems/container-with-most-water/",
    neetcode: "https://neetcode.io/problems/max-water-container/question",
  },
  {
    leetcode: "https://leetcode.com/problems/trapping-rain-water/",
    neetcode: "https://neetcode.io/problems/trapping-rain-water/question",
  },
];
export const stackProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/valid-parentheses/",
    neetcode: "https://neetcode.io/problems/validate-parentheses/question",
  },
  {
    leetcode: "https://leetcode.com/problems/min-stack/",
    neetcode: "https://neetcode.io/problems/minimum-stack/question",
  },
  {
    leetcode: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    neetcode:
      "https://neetcode.io/problems/evaluate-reverse-polish-notation/question",
  },
  {
    leetcode: "https://leetcode.com/problems/generate-parentheses/",
    neetcode: "https://neetcode.io/problems/generate-parentheses/question",
  },
  {
    leetcode: "https://leetcode.com/problems/daily-temperatures/",
    neetcode: "https://neetcode.io/problems/daily-temperatures/question",
  },
  {
    leetcode: "https://leetcode.com/problems/car-fleet/",
    neetcode: "https://neetcode.io/problems/car-fleet/question",
  },
  {
    leetcode: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    neetcode:
      "https://neetcode.io/problems/largest-rectangle-in-histogram/question",
  },
];
export const binarySearchProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/binary-search/",
    neetcode: "https://neetcode.io/problems/binary-search/question",
  },
  {
    leetcode: "https://leetcode.com/problems/search-a-2d-matrix/",
    neetcode: "https://neetcode.io/problems/search-2d-matrix/question",
  },
  {
    leetcode: "https://leetcode.com/problems/koko-eating-bananas/",
    neetcode: "https://neetcode.io/problems/eating-bananas/question",
  },
  {
    leetcode:
      "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    neetcode:
      "https://neetcode.io/problems/find-minimum-in-rotated-sorted-array/question",
  },
  {
    leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    neetcode:
      "https://neetcode.io/problems/find-target-in-rotated-sorted-array/question",
  },
  {
    leetcode: "https://leetcode.com/problems/time-based-key-value-store/",
    neetcode:
      "https://neetcode.io/problems/time-based-key-value-store/question",
  },
  {
    leetcode: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    neetcode:
      "https://neetcode.io/problems/median-of-two-sorted-arrays/question",
  },
];
export const slidingWindowProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    neetcode: "https://neetcode.io/problems/buy-and-sell-crypto/question",
  },
  {
    leetcode:
      "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    neetcode:
      "https://neetcode.io/problems/longest-substring-without-duplicates/question",
  },
  {
    leetcode:
      "https://leetcode.com/problems/longest-repeating-character-replacement/",
    neetcode:
      "https://neetcode.io/problems/longest-repeating-substring-with-replacement/question",
  },
  {
    leetcode: "https://leetcode.com/problems/permutation-in-string/",
    neetcode: "https://neetcode.io/problems/permutation-string/question",
  },
  {
    leetcode: "https://leetcode.com/problems/minimum-window-substring/",
    neetcode:
      "https://neetcode.io/problems/minimum-window-with-characters/question",
  },
  {
    leetcode: "https://leetcode.com/problems/sliding-window-maximum/",
    neetcode: "https://neetcode.io/problems/sliding-window-maximum/question",
  },
];
export const linkedListProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/reverse-linked-list/",
    neetcode: "https://neetcode.io/problems/reverse-a-linked-list/question",
  },
  {
    leetcode: "https://leetcode.com/problems/merge-two-sorted-lists/",
    neetcode:
      "https://neetcode.io/problems/merge-two-sorted-linked-lists/question",
  },
  {
    leetcode: "https://leetcode.com/problems/reorder-list/",
    neetcode: "https://neetcode.io/problems/reorder-linked-list/question",
  },
  {
    leetcode: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    neetcode:
      "https://neetcode.io/problems/remove-node-from-end-of-linked-list/question",
  },
  {
    leetcode: "https://leetcode.com/problems/copy-list-with-random-pointer/",
    neetcode:
      "https://neetcode.io/problems/copy-linked-list-with-random-pointer/question",
  },
  {
    leetcode: "https://leetcode.com/problems/add-two-numbers/",
    neetcode: "https://neetcode.io/problems/add-two-numbers/question",
  },
  {
    leetcode: "https://leetcode.com/problems/linked-list-cycle/",
    neetcode:
      "https://neetcode.io/problems/linked-list-cycle-detection/question",
  },
  {
    leetcode: "https://leetcode.com/problems/find-the-duplicate-number/",
    neetcode: "https://neetcode.io/problems/find-duplicate-integer/question",
  },
  {
    leetcode: "https://leetcode.com/problems/lru-cache/",
    neetcode: "https://neetcode.io/problems/lru-cache/question",
  },
  {
    leetcode: "https://leetcode.com/problems/merge-k-sorted-lists/",
    neetcode:
      "https://neetcode.io/problems/merge-k-sorted-linked-lists/question",
  },
  {
    leetcode: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
    neetcode: "https://neetcode.io/problems/reverse-nodes-in-k-group/question",
  },
];
export const treeProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/invert-binary-tree/",
    neetcode: "https://neetcode.io/problems/invert-a-binary-tree/question",
  },
  {
    leetcode: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    neetcode: "https://neetcode.io/problems/depth-of-binary-tree/question",
  },
  {
    leetcode: "https://leetcode.com/problems/diameter-of-binary-tree/",
    neetcode: "https://neetcode.io/problems/binary-tree-diameter/question",
  },
  {
    leetcode: "https://leetcode.com/problems/balanced-binary-tree/",
    neetcode: "https://neetcode.io/problems/balanced-binary-tree/question",
  },
  {
    leetcode: "https://leetcode.com/problems/same-tree/",
    neetcode: "https://neetcode.io/problems/same-binary-tree/question",
  },
  {
    leetcode: "https://leetcode.com/problems/subtree-of-another-tree/",
    neetcode: "https://neetcode.io/problems/subtree-of-a-binary-tree/question",
  },
  {
    leetcode:
      "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    neetcode:
      "https://neetcode.io/problems/lowest-common-ancestor-in-binary-search-tree/question",
  },
  {
    leetcode:
      "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    neetcode:
      "https://neetcode.io/problems/level-order-traversal-of-binary-tree/question",
  },
  {
    leetcode: "https://leetcode.com/problems/binary-tree-right-side-view/",
    neetcode:
      "https://neetcode.io/problems/binary-tree-right-side-view/question",
  },
  {
    leetcode: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",
    neetcode:
      "https://neetcode.io/problems/count-good-nodes-in-binary-tree/question",
  },
  {
    leetcode: "https://leetcode.com/problems/validate-binary-search-tree/",
    neetcode: "https://neetcode.io/problems/valid-binary-search-tree/question",
  },
  {
    leetcode: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    neetcode:
      "https://neetcode.io/problems/kth-smallest-integer-in-bst/question",
  },
  {
    leetcode:
      "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    neetcode:
      "https://neetcode.io/problems/binary-tree-from-preorder-and-inorder-traversal/question",
  },
  {
    leetcode: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    neetcode:
      "https://neetcode.io/problems/binary-tree-maximum-path-sum/question",
  },
  {
    leetcode:
      "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    neetcode:
      "https://neetcode.io/problems/serialize-and-deserialize-binary-tree/question",
  },
];
export const triesProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/implement-trie-prefix-tree/",
    neetcode: "https://neetcode.io/problems/implement-prefix-tree/question",
  },
  {
    leetcode:
      "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
    neetcode:
      "https://neetcode.io/problems/design-word-search-data-structure/question",
  },
  {
    leetcode: "https://leetcode.com/problems/word-search-ii/",
    neetcode: "https://neetcode.io/problems/search-for-word-ii/question",
  },
];
export const backTrackingProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/subsets/",
    neetcode: "https://neetcode.io/problems/subsets/question",
  },
  {
    leetcode: "https://leetcode.com/problems/combination-sum/",
    neetcode: "https://neetcode.io/problems/combination-target-sum/question",
  },
  {
    leetcode: "https://leetcode.com/problems/permutations/",
    neetcode: "https://neetcode.io/problems/permutations/question",
  },
  {
    leetcode: "https://leetcode.com/problems/subsets-ii/",
    neetcode: "https://neetcode.io/problems/subsets-ii/question",
  },
  {
    leetcode: "https://leetcode.com/problems/combination-sum-ii/",
    neetcode: "https://neetcode.io/problems/combination-target-sum-ii/question",
  },
  {
    leetcode: "https://leetcode.com/problems/word-search/",
    neetcode: "https://neetcode.io/problems/search-for-word/question",
  },
  {
    leetcode: "https://leetcode.com/problems/palindrome-partitioning/",
    neetcode: "https://neetcode.io/problems/palindrome-partitioning/question",
  },
  {
    leetcode:
      "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
    neetcode:
      "https://neetcode.io/problems/combinations-of-a-phone-number/question",
  },
  {
    leetcode: "https://leetcode.com/problems/n-queens/",
    neetcode: "https://neetcode.io/problems/n-queens/question",
  },
];
export const heapPriorityQueueProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
    neetcode:
      "https://neetcode.io/problems/kth-largest-integer-in-a-stream/question",
  },
  {
    leetcode: "https://leetcode.com/problems/last-stone-weight/",
    neetcode: "https://neetcode.io/problems/last-stone-weight/question",
  },
  {
    leetcode: "https://leetcode.com/problems/k-closest-points-to-origin/",
    neetcode:
      "https://neetcode.io/problems/k-closest-points-to-origin/question",
  },
  {
    leetcode: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    neetcode:
      "https://neetcode.io/problems/kth-largest-element-in-an-array/question",
  },
  {
    leetcode: "https://leetcode.com/problems/task-scheduler/",
    neetcode: "https://neetcode.io/problems/task-scheduling/question",
  },
  {
    leetcode: "https://leetcode.com/problems/design-twitter/",
    neetcode: "https://neetcode.io/problems/design-twitter-feed/question",
  },
  {
    leetcode: "https://leetcode.com/problems/find-median-from-data-stream/",
    neetcode:
      "https://neetcode.io/problems/find-median-in-a-data-stream/question",
  },
];
export const graphProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/number-of-islands/",
    neetcode: "https://neetcode.io/problems/count-number-of-islands/question",
  },
  {
    leetcode: "https://leetcode.com/problems/max-area-of-island/",
    neetcode: "https://neetcode.io/problems/max-area-of-island/question",
  },
  {
    leetcode: "https://leetcode.com/problems/clone-graph/",
    neetcode: "https://neetcode.io/problems/clone-graph/question",
  },
  {
    leetcode: "https://leetcode.com/problems/walls-and-gates/",
    neetcode: "https://neetcode.io/problems/islands-and-treasure/question",
  },
  {
    leetcode: "https://leetcode.com/problems/rotting-oranges/",
    neetcode: "https://neetcode.io/problems/rotting-fruit/question",
  },
  {
    leetcode: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    neetcode:
      "https://neetcode.io/problems/pacific-atlantic-water-flow/question",
  },
  {
    leetcode: "https://leetcode.com/problems/surrounded-regions/",
    neetcode: "https://neetcode.io/problems/surrounded-regions/question",
  },
  {
    leetcode: "https://leetcode.com/problems/course-schedule/",
    neetcode: "https://neetcode.io/problems/course-schedule/question",
  },
  {
    leetcode: "https://leetcode.com/problems/course-schedule-ii/",
    neetcode: "https://neetcode.io/problems/course-schedule-ii/question",
  },
  {
    leetcode: "https://leetcode.com/problems/graph-valid-tree/",
    neetcode: "https://neetcode.io/problems/valid-tree/question",
  },
  {
    leetcode:
      "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
    neetcode:
      "https://neetcode.io/problems/count-connected-components/question",
  },
  {
    leetcode: "https://leetcode.com/problems/redundant-connection/",
    neetcode: "https://neetcode.io/problems/redundant-connection/question",
  },
  {
    leetcode: "https://leetcode.com/problems/word-ladder/",
    neetcode: "https://neetcode.io/problems/word-ladder/question",
  },
];
export const oneDimensionalDynamicProgrammingProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/climbing-stairs/",
    neetcode: "https://neetcode.io/problems/climbing-stairs/question",
  },
  {
    leetcode: "https://leetcode.com/problems/min-cost-climbing-stairs/",
    neetcode: "https://neetcode.io/problems/min-cost-climbing-stairs/question",
  },
  {
    leetcode: "https://leetcode.com/problems/house-robber/",
    neetcode: "https://neetcode.io/problems/house-robber/question",
  },
  {
    leetcode: "https://leetcode.com/problems/house-robber-ii/",
    neetcode: "https://neetcode.io/problems/house-robber-ii/question",
  },
  {
    leetcode: "https://leetcode.com/problems/longest-palindromic-substring/",
    neetcode:
      "https://neetcode.io/problems/longest-palindromic-substring/question",
  },
  {
    leetcode: "https://leetcode.com/problems/palindromic-substrings/",
    neetcode: "https://neetcode.io/problems/palindromic-substrings/question",
  },
  {
    leetcode: "https://leetcode.com/problems/decode-ways/",
    neetcode: "https://neetcode.io/problems/decode-ways/question",
  },
  {
    leetcode: "https://leetcode.com/problems/coin-change/",
    neetcode: "https://neetcode.io/problems/coin-change/question",
  },
  {
    leetcode: "https://leetcode.com/problems/maximum-product-subarray/",
    neetcode: "https://neetcode.io/problems/maximum-product-subarray/question",
  },
  {
    leetcode: "https://leetcode.com/problems/word-break/",
    neetcode: "https://neetcode.io/problems/word-break/question",
  },
  {
    leetcode: "https://leetcode.com/problems/longest-increasing-subsequence/",
    neetcode:
      "https://neetcode.io/problems/longest-increasing-subsequence/question",
  },
  {
    leetcode: "https://leetcode.com/problems/partition-equal-subset-sum/",
    neetcode:
      "https://neetcode.io/problems/partition-equal-subset-sum/question",
  },
];
export const intervalProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/insert-interval/",
    neetcode: "https://neetcode.io/problems/insert-new-interval/question",
  },
  {
    leetcode: "https://leetcode.com/problems/merge-intervals/",
    neetcode: "https://neetcode.io/problems/merge-intervals/question",
  },
  {
    leetcode: "https://leetcode.com/problems/non-overlapping-intervals/",
    neetcode: "https://neetcode.io/problems/non-overlapping-intervals/question",
  },
  {
    leetcode: "https://leetcode.com/problems/meeting-rooms/",
    neetcode: "https://neetcode.io/problems/meeting-schedule/question",
  },
  {
    leetcode: "https://leetcode.com/problems/meeting-rooms-ii/",
    neetcode: "https://neetcode.io/problems/meeting-schedule-ii/question",
  },
  {
    leetcode:
      "https://leetcode.com/problems/minimum-interval-to-include-each-query/",
    neetcode:
      "https://neetcode.io/problems/minimum-interval-including-query/question",
  },
];
export const greedyProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/maximum-subarray/",
    neetcode: "https://neetcode.io/problems/maximum-subarray/question",
  },
  {
    leetcode: "https://leetcode.com/problems/jump-game/",
    neetcode: "https://neetcode.io/problems/jump-game/question",
  },
  {
    leetcode: "https://leetcode.com/problems/jump-game-ii/",
    neetcode: "https://neetcode.io/problems/jump-game-ii/question",
  },
  {
    leetcode: "https://leetcode.com/problems/gas-station/",
    neetcode: "https://neetcode.io/problems/gas-station/question",
  },
  {
    leetcode: "https://leetcode.com/problems/hand-of-straights/",
    neetcode: "https://neetcode.io/problems/hand-of-straights/question",
  },
  {
    leetcode:
      "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/",
    neetcode:
      "https://neetcode.io/problems/merge-triplets-to-form-target/question",
  },
  {
    leetcode: "https://leetcode.com/problems/partition-labels/",
    neetcode: "https://neetcode.io/problems/partition-labels/question",
  },
  {
    leetcode: "https://leetcode.com/problems/valid-parenthesis-string/",
    neetcode: "https://neetcode.io/problems/valid-parenthesis-string/question",
  },
];
export const advancedGraphProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/reconstruct-itinerary/",
    neetcode: "https://neetcode.io/problems/reconstruct-flight-path/question",
  },
  {
    leetcode: "https://leetcode.com/problems/min-cost-to-connect-all-points/",
    neetcode:
      "https://neetcode.io/problems/min-cost-to-connect-points/question",
  },
  {
    leetcode: "https://leetcode.com/problems/network-delay-time/",
    neetcode: "https://neetcode.io/problems/network-delay-time/question",
  },
  {
    leetcode: "https://leetcode.com/problems/swim-in-rising-water/",
    neetcode: "https://neetcode.io/problems/swim-in-rising-water/question",
  },
  {
    leetcode: "https://leetcode.com/problems/alien-dictionary/",
    neetcode: "https://neetcode.io/problems/foreign-dictionary/question",
  },
  {
    leetcode: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
    neetcode: "https://neetcode.io/problems/cheapest-flight-path/question",
  },
];
export const twoDimensionalDynamicProgrammingProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/unique-paths/",
    neetcode: "https://neetcode.io/problems/count-paths/question",
  },
  {
    leetcode: "https://leetcode.com/problems/longest-common-subsequence/",
    neetcode:
      "https://neetcode.io/problems/longest-common-subsequence/question",
  },
  {
    leetcode:
      "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
    neetcode:
      "https://neetcode.io/problems/buy-and-sell-crypto-with-cooldown/question",
  },
  {
    leetcode: "https://leetcode.com/problems/coin-change-ii/",
    neetcode: "https://neetcode.io/problems/coin-change-ii/question",
  },
  {
    leetcode: "https://leetcode.com/problems/target-sum/",
    neetcode: "https://neetcode.io/problems/target-sum/question",
  },
  {
    leetcode: "https://leetcode.com/problems/interleaving-string/",
    neetcode: "https://neetcode.io/problems/interleaving-string/question",
  },
  {
    leetcode:
      "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
    neetcode:
      "https://neetcode.io/problems/longest-increasing-path-in-matrix/question",
  },
  {
    leetcode: "https://leetcode.com/problems/distinct-subsequences/",
    neetcode: "https://neetcode.io/problems/count-subsequences/question",
  },
  {
    leetcode: "https://leetcode.com/problems/edit-distance/",
    neetcode: "https://neetcode.io/problems/edit-distance/question",
  },
  {
    leetcode: "https://leetcode.com/problems/burst-balloons/",
    neetcode: "https://neetcode.io/problems/burst-balloons/question",
  },
  {
    leetcode: "https://leetcode.com/problems/regular-expression-matching/",
    neetcode:
      "https://neetcode.io/problems/regular-expression-matching/question",
  },
];
export const bitManipulationProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/single-number/",
    neetcode: "https://neetcode.io/problems/single-number/question",
  },
  {
    leetcode: "https://leetcode.com/problems/number-of-1-bits/",
    neetcode: "https://neetcode.io/problems/number-of-one-bits/question",
  },
  {
    leetcode: "https://leetcode.com/problems/counting-bits/",
    neetcode: "https://neetcode.io/problems/counting-bits/question",
  },
  {
    leetcode: "https://leetcode.com/problems/reverse-bits/",
    neetcode: "https://neetcode.io/problems/reverse-bits/question",
  },
  {
    leetcode: "https://leetcode.com/problems/missing-number/",
    neetcode: "https://neetcode.io/problems/missing-number/question",
  },
  {
    leetcode: "https://leetcode.com/problems/sum-of-two-integers/",
    neetcode: "https://neetcode.io/problems/sum-of-two-integers/question",
  },
  {
    leetcode: "https://leetcode.com/problems/reverse-integer/",
    neetcode: "https://neetcode.io/problems/reverse-integer/question",
  },
];
export const mathGeometryProblems: Problem[] = [
  {
    leetcode: "https://leetcode.com/problems/rotate-image/",
    neetcode: "https://neetcode.io/problems/rotate-matrix/question",
  },
  {
    leetcode: "https://leetcode.com/problems/spiral-matrix/",
    neetcode: "https://neetcode.io/problems/spiral-matrix/question",
  },
  {
    leetcode: "https://leetcode.com/problems/set-matrix-zeroes/",
    neetcode: "https://neetcode.io/problems/set-zeroes-in-matrix/question",
  },
  {
    leetcode: "https://leetcode.com/problems/happy-number/",
    neetcode: "https://neetcode.io/problems/non-cyclical-number/question",
  },
  {
    leetcode: "https://leetcode.com/problems/plus-one/",
    neetcode: "https://neetcode.io/problems/plus-one/question",
  },
  {
    leetcode: "https://leetcode.com/problems/powx-n/",
    neetcode: "https://neetcode.io/problems/pow-x-n/question",
  },
  {
    leetcode: "https://leetcode.com/problems/multiply-strings/",
    neetcode: "https://neetcode.io/problems/multiply-strings/question",
  },
  {
    leetcode: "https://leetcode.com/problems/detect-squares/",
    neetcode: "https://neetcode.io/problems/count-squares/question",
  },
];

export const problems = {
  arrays: arrayProblems,
  twoPointers: twoPointerProblems,
  stacks: stackProblems,
  binarySearch: binarySearchProblems,
  slidingWindow: slidingWindowProblems,
  linkedList: linkedListProblems,
  trees: treeProblems,
  tries: triesProblems,
  backtracking: backTrackingProblems,
  heap_priorityq: heapPriorityQueueProblems,
  graphs: graphProblems,
  oneDDP: oneDimensionalDynamicProgrammingProblems,
  intervals: intervalProblems,
  greedy: greedyProblems,
  advancedGraphs: advancedGraphProblems,
  twoDDP: twoDimensionalDynamicProgrammingProblems,
  bitManipulation: bitManipulationProblems,
  mathGeometry: mathGeometryProblems,
};

export default problems;
