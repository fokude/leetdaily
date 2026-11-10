# Spaced Complexity

Spaced Complexity is a Chrome and Firefox companion for LeetCode and DSA interview preparation. It serves random problems from NeetCode 150, Blind 75, Grind 169 or your own lists, and brings the ones you struggled with back on a spaced-repetition schedule so the knowledge sticks.

Random practice is good for exposure, but consolidating what you have already seen is what makes it stay. Spaced Complexity is built around that second part.

This is an independent project and is not affiliated with LeetCode or NeetCode.

## How it is meant to be used

1. Pick a list from the badge under the title in the popup. For NeetCode 150 you can also pick a category.
2. Click `Go`. A random problem opens in your current tab and the popup closes.
3. Solve it, then reopen the popup. It asks how it went:
   - `Nailed it` marks it solved.
   - `Shaky` marks it solved but queues it for review.
   - `Missed` queues it for review without marking it solved.
4. Queued problems come back at 1, 3, 7, 14 and 30 days. Nailing a review moves it to the next step, missing one sends it back to the first. After the 30 day step it leaves the queue.
5. The extension icon shows how many reviews are due, and `Review due` in the popup opens the most overdue one.
6. Open the dashboard from the grid icon in the popup to see every problem in a list, what is solved, and the revisit queue with last attempt and due dates.

Solved and revisit are separate on purpose. A problem can be solved and still worth reviewing, and `Skip` on the rating prompt records nothing.

## Features

- Built-in lists: NeetCode 150, Blind 75 and Grind 169, plus custom lists from pasted links.
- Spaced-repetition revisit queue with a due-count badge on the icon.
- A daily streak. A day counts when you rate at least one problem, and it resets after a missed day.
- Dashboard with progress per list, filters, and reset buttons for a list or the queue.
- LeetCode's daily challenge in one click, and an option to open problems on NeetCode instead.
- Light and dark mode, light by default.
- Progress syncs across devices through the browser account. Export and import for backups.

## How to Run

Follow these steps to clone and run the project on your local machine:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/fokude/leetdaily
   ```

2. Navigate to the project directory:

   ```bash
   cd C:\...\leetdaily
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Build the app:
   ```bash
   npm run build
   ```
5. Load the extension:
   - Navigate to `chrome://extensions/` in your chosen chromium browser
   - Click `load unpacked`
   - Drag `./dist` folder into the box
   - You should be able to see the extension in your extensions tab

### Firefox

```bash
npm run start:firefox
```

This builds the extension, writes a Firefox version to `./dist-firefox` and opens it in a temporary Firefox profile using `web-ext`. Use `npm run package:firefox` to create a zip for addons.mozilla.org. The add-on ID Firefox needs for sync is set in `scripts/firefox-manifest.mjs`.

Every time you make a change to the code, make sure you rebuild locally then click reload extension on the extensions dashboard.

## Lists, importing and backups

Pick the active list from the badge under the title in the popup. The dashboard uses the same list, so changing it in one place changes it in the other. NeetCode 150, Blind 75 and Grind 169 are built in.

### Custom lists

On the dashboard, click `+ New list` and paste LeetCode problem links or slugs. Any of these work, one per line or separated by commas:

```text
https://leetcode.com/problems/two-sum/
valid-anagram
3sum, lru-cache
["two-sum", "group-anagrams"]
```

Titles with spaces (`Two Sum`) are skipped because they cannot be turned into a link reliably. A list holds up to 200 problems.

### Backups

`Export` on the dashboard downloads a JSON file and `Import` replaces your progress and custom lists with one. This is also how to move progress between browsers, for example Chrome to Firefox.

```json
{
  "version": 1,
  "progress": {
    "two-sum": { "solved": true, "box": 2, "last": 20402, "due": 20405 }
  },
  "lists": [{ "id": "c1", "name": "My list", "slugs": ["two-sum"] }]
}
```

`box` is the review step (0 means not in the revisit queue, 1 to 5 are the 1, 3, 7, 14 and 30 day steps). `last` and `due` are day numbers, counted as days since 1 Jan 1970 in local time.

### Where data lives

| Data | Stored in | Syncs |
| --- | --- | --- |
| Progress, custom lists, active list, streak | `chrome.storage.sync` | Across devices signed into the same Chrome or Firefox account |
| Theme, NeetCode toggle, last opened problem | Local to the browser | No |

Sync does not work between different browsers. Use Export and Import for that.

## How to Test

Ensure the project functions as expected by following these steps:

1. Follow steps (1-3) from [above](#how-to-run)
2. Run tests:

   ```bash
    npm run test
   ```

   Alternatively, one can generate coverage reports using:

   ```bash
   npm run test -- --coverage
   ```

## How to Contribute

Contributions are welcome! Here's how you can help:

- Please write tests and try to use [semantic commit messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)

1. Fork the repository
2. Create a new branch for your feature or bug fix (look through the github issues)
3. Make your changes
4. Commit your changes and push to your fork
5. Create a pull request

[This repository](https://github.com/akarsh1995/leetcode-graphql-queries) helped me work with the public Leetcode graphql API
[This medium article](https://ajaynjain.medium.com/how-i-built-a-chrome-extension-with-react-and-vite-without-crxjs-plugin-b607194c4f5e) helped me configure the service-worker.
You may also find them helpful when working with the project.
