# LeetDaily

The Neetcode 150 is a popular road map for technical interview preparation questions to work through. After completing the roadmap, it may be helpful to reinforce the learning with repetition. This chrome extension randomly selects a question from a specified category (or all categories by default).

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
| Progress, custom lists, active list | `chrome.storage.sync` | Across devices signed into the same Chrome or Firefox account |
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
