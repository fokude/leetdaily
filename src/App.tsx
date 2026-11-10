import { useEffect, useState } from "react";
import "./styles/App.css";
import { ProblemEndpoint } from "./problems/ProblemEndpoint";
import CategorySelect from "./components/category/CategorySelect";
import Button from "./components/button/Button";
import Link from "./components/link/Link";
import { Category } from "./problems/__data__/Problems";
import { applyTheme, getTheme, saveTheme, Theme } from "./theme/theme";
import { SOURCE_CODE_URL } from "./links";
import { sendMessageToBackground } from "./chrome/chrome-utils";
import {
  ProblemLink,
  problemFromSlug,
  problemName,
  slugOf,
} from "./lists/catalog";
import {
  Rating,
  applyRating,
  dueSlugs,
  queuedSlugs,
  today,
} from "./progress/records";
import { useProgress } from "./progress/useProgress";
import { storageGet, storageRemove, storageSet } from "./storage/storage";

const LAST_OPENED_KEY = "lastOpened";

function App() {
  const [category, setCategory] = useState<Category>(Category.ALL);
  const [useNeetCode, setUseNeetCode] = useState<boolean>(() => {
    return localStorage.getItem("useNeetCode") === "true";
  });

  const { progress, update } = useProgress();
  const [lastOpened, setLastOpened] = useState<string | null>(null);

  useEffect(() => {
    storageGet<string>([LAST_OPENED_KEY], "local").then((res) =>
      setLastOpened(res[LAST_OPENED_KEY] ?? null),
    );
  }, []);

  const queued = queuedSlugs(progress);
  const due = dueSlugs(progress, today());

  const finishRating = () => {
    storageRemove([LAST_OPENED_KEY], "local");
    setLastOpened(null);
  };

  const handleRating = (rating: Rating) => {
    if (!lastOpened) return;
    update([lastOpened], (rec) => applyRating(rec, rating, today()));
    finishRating();
  };

  const openProblem = (problem: ProblemLink) => {
    storageSet({ [LAST_OPENED_KEY]: problem.slug }, "local");
    openUrl(
      useNeetCode && problem.neetcode ? problem.neetcode : problem.leetcode,
    );
  };

  const [theme, setTheme] = useState<Theme>(getTheme);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    saveTheme(next);
  };

  const handleToggle = (checked: boolean) => {
    setUseNeetCode(checked);
    localStorage.setItem("useNeetCode", String(checked));
  };

  const getDestinationUrl = (url: string): string => {
    if (!useNeetCode) return url;
    const match = url.match(/\/problems\/([^/]+)/);
    if (match && match[1]) {
      let slug = match[1];
      if (slug === "reverse-linked-list") {
        slug = "reverse-a-linked-list";
      } else if (slug === "merge-two-sorted-lists") {
        slug = "merge-two-sorted-linked-lists";
      } else if (slug === "reorder-list") {
        slug = "reorder-linked-list";
      }
      return `https://neetcode.io/problems/${slug}/question?list=neetcode150`;
    }
    return url;
  };

  const openUrl = (url: string) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab && activeTab.id) {
        chrome.tabs.update(activeTab.id, { url });
      } else {
        chrome.tabs.create({ url });
      }
    });
  };

  const open150 = async () => {
    const picked = new ProblemEndpoint().getRandomProblem(category);
    openProblem(problemFromSlug(slugOf(picked.leetcode)));
  };

  const openRevisit = () => {
    if (due.length) openProblem(problemFromSlug(due[0]));
  };

  const openDashboard = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("dashboard.html") });
  };

  const openSourceCode = async () => {
    chrome.tabs.create({ url: SOURCE_CODE_URL });
  };

  const openDailyChallange = async () => {
    const response = await sendMessageToBackground<string>("getDailyChallenge");
    const finalUrl = getDestinationUrl(response);
    openUrl(finalUrl);
  };

  return (
    <>
      <div className="header">
        <button
          type="button"
          className="theme-toggle"
          data-testid="theme_toggle"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          onClick={toggleTheme}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {theme === "dark" ? (
              <>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </>
            ) : (
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            )}
          </svg>
        </button>
        <div className="logo-container">
          <svg
            className="logo-svg"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="title-container">
          <h1 data-testid={"title"} className="app-title">
            LeetDaily
          </h1>
          <div data-testid={"subheading"} className="badge">
            Neetcode 150
          </div>
          <p className="description">
            Reinforce your skills with active recall. Select a category to
            begin.
          </p>
        </div>
      </div>

      {lastOpened && (
        <div className="card recall-card" data-testid="recall_card">
          <p className="recall-title">
            How did <strong>{problemName(lastOpened)}</strong> go?
          </p>
          <div className="recall-actions">
            <Button
              id="nailed_button"
              onClick={() => handleRating("nailed")}
              variant="primary"
            >
              <span>Nailed it</span>
            </Button>
            <Button
              id="shaky_button"
              onClick={() => handleRating("shaky")}
              variant="secondary"
            >
              <span>Shaky</span>
            </Button>
            <Button
              id="missed_button"
              onClick={() => handleRating("missed")}
              variant="secondary"
            >
              <span>Missed</span>
            </Button>
          </div>
        </div>
      )}

      <div className="card">
        <CategorySelect onChange={setCategory} />

        <div className="toggle-group">
          <span className="toggle-label">
            <svg
              className="toggle-label-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            Solve on NeetCode
          </span>
          <label className="switch">
            <input
              type="checkbox"
              data-testid="platform_toggle"
              checked={useNeetCode}
              onChange={(e) => handleToggle(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="divider"></div>

        <Button id="search_button" onClick={open150} variant="primary">
          <span>Go</span>
          <svg
            className="btn-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Button>

        <Button
          id="revisit_queue_button"
          onClick={openRevisit}
          variant="secondary"
          disabled={due.length === 0}
        >
          <span>
            {due.length > 0
              ? `Review due (${due.length})`
              : `Nothing due (${queued.length} queued)`}
          </span>
        </Button>

        <Button
          id="daily_button"
          onClick={openDailyChallange}
          variant="secondary"
        >
          <svg
            className="btn-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>Today's Daily Challenge</span>
        </Button>
      </div>

      <div className="footer">
        <Link onClick={openDashboard} testId="dashboard_link">
          <span>Dashboard</span>
        </Link>
        <Link onClick={openSourceCode}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          <span>Source Code</span>
        </Link>
      </div>
    </>
  );
}

export default App;
