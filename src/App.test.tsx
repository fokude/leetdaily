import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import App from "./App";

describe("App.tsx", () => {
  beforeEach(async () => {
    // happy-dom's real window.close would tear down the test window
    vi.spyOn(window, "close").mockImplementation(() => {});
    const LeetcodeEndpoint = (await import("./leetcode/LeetcodeEndpoint"))
      .default;
    vi.spyOn(
      LeetcodeEndpoint.prototype,
      "getDailyChallenge",
    ).mockImplementation(
      async () => "/problems/range-sum-of-sorted-subarray-sums/",
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  test('Renders page, with default select option as "All"', async () => {
    render(<App />);

    const select = screen.getByTestId("category_select");
    expect(select).toHaveTextContent("All");
  });

  test("Currently selected category should change when user clicks a different option", async () => {
    render(<App />);

    const select = screen.getByTestId("category_select");
    await userEvent.click(select);
    await userEvent.click(screen.getByTestId("BACKTRACKING"));
    expect(select).toHaveTextContent("Backtracking");
  });

  test("chrome tab api should be called to open the github repo in new tab when user clicks source code link", async () => {
    const createTabMock = vi.fn();
    vi.stubGlobal("chrome", {
      tabs: {
        create: createTabMock,
      },
    });

    render(<App />);

    const link = screen.getByTestId("github_link");

    await userEvent.click(link);

    expect(createTabMock).toHaveBeenCalledWith({
      url: "https://github.com/fokude/leetdaily",
    });

    vi.unstubAllGlobals();
  });

  test("chrome tab api should be called to open leetcode question in active tab when user clicks go", async () => {
    const updateTabMock = vi.fn();
    const queryTabsMock = vi.fn().mockImplementation((_queryInfo, callback) => {
      callback([{ id: 123 }]);
    });
    vi.stubGlobal("chrome", {
      tabs: {
        query: queryTabsMock,
        update: updateTabMock,
        create: vi.fn(),
      },
    });

    render(<App />);

    const button = screen.getByTestId("search_button");
    await userEvent.click(button);

    expect(updateTabMock).toHaveBeenCalledWith(
      123,
      expect.objectContaining({
        url: expect.stringContaining("https://leetcode.com/problems/"),
      }),
    );

    vi.unstubAllGlobals();
  });

  test("chrome runtime api should be called to send message to service-worker when user clicks open daily", async () => {
    const sendMessageMock = vi.fn();
    vi.stubGlobal("chrome", {
      tabs: {
        query: vi.fn().mockImplementation((_queryInfo, callback) => {
          callback([{ id: 123 }]);
        }),
        update: vi.fn(),
        create: vi.fn(),
      },
      runtime: {
        sendMessage: sendMessageMock,
      },
    });

    render(<App />);

    const button = screen.getByTestId("daily_button");
    await userEvent.click(button);

    expect(sendMessageMock).toHaveBeenCalledWith("getDailyChallenge");

    vi.unstubAllGlobals();
  });
  test("LeetcodeEndpoint class method + chrome tab api should be called to open daily in active tab when the user clicks the open daily button", async () => {
    const updateTabMock = vi.fn();
    const queryTabsMock = vi.fn().mockImplementation((_queryInfo, callback) => {
      callback([{ id: 123 }]);
    });
    const sendMessageMock = vi.fn().mockImplementation(() => {
      const lc = new LeetcodeEndpoint();
      return lc.getDailyChallenge();
    });
    vi.stubGlobal("chrome", {
      tabs: {
        query: queryTabsMock,
        update: updateTabMock,
        create: vi.fn(),
      },
      runtime: {
        sendMessage: sendMessageMock,
      },
    });

    const LeetcodeEndpoint = (await import("./leetcode/LeetcodeEndpoint"))
      .default;
    const getDailyChallengeMethodSpy = vi.spyOn(
      LeetcodeEndpoint.prototype,
      "getDailyChallenge",
    );

    render(<App />);
    const button = screen.getByTestId("daily_button");
    await userEvent.click(button);
    expect(getDailyChallengeMethodSpy).toBeCalled();
    expect(updateTabMock).toHaveBeenCalledWith(
      123,
      expect.objectContaining({
        url: "/problems/range-sum-of-sorted-subarray-sums/",
      }),
    );
  });
  test("should open problem in neetcode when neetcode platform toggle is checked", async () => {
    const updateTabMock = vi.fn();
    const queryTabsMock = vi.fn().mockImplementation((_queryInfo, callback) => {
      callback([{ id: 123 }]);
    });
    vi.stubGlobal("chrome", {
      tabs: {
        query: queryTabsMock,
        update: updateTabMock,
        create: vi.fn(),
      },
    });

    render(<App />);

    const toggle = screen.getByTestId("platform_toggle");
    await userEvent.click(toggle);

    const button = screen.getByTestId("search_button");
    await userEvent.click(button);

    expect(updateTabMock).toHaveBeenCalledWith(
      123,
      expect.objectContaining({
        url: expect.stringMatching(
          /https:\/\/neetcode\.io\/problems\/.+\/question/,
        ),
      }),
    );

    vi.unstubAllGlobals();
  });

  test("rating last problem as missed queues it for tomorrow", async () => {
    localStorage.clear();
    vi.stubGlobal("chrome", {
      tabs: {
        query: vi.fn().mockImplementation((_q, cb) => cb([{ id: 1 }])),
        update: vi.fn(),
        create: vi.fn(),
      },
    });

    const { unmount } = render(<App />);
    await userEvent.click(screen.getByTestId("search_button"));
    unmount();

    render(<App />);
    expect(await screen.findByTestId("recall_card")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("missed_button"));

    expect(screen.queryByTestId("recall_card")).not.toBeInTheDocument();
    expect(await screen.findByTestId("revisit_queue_button")).toHaveTextContent(
      "1 queued",
    );

    vi.unstubAllGlobals();
  });

  test("theme defaults to light and toggle saves dark preference", async () => {
    localStorage.clear();
    render(<App />);

    await userEvent.click(screen.getByTestId("theme_toggle"));

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");

    await userEvent.click(screen.getByTestId("theme_toggle"));
    expect(localStorage.getItem("theme")).toBe("light");
  });

  test("dashboard link opens the dashboard page in a new tab", async () => {
    const createTabMock = vi.fn();
    vi.stubGlobal("chrome", {
      tabs: { create: createTabMock },
      runtime: { getURL: (path: string) => `chrome-extension://abc/${path}` },
    });

    render(<App />);
    await userEvent.click(screen.getByTestId("dashboard_link"));

    expect(createTabMock).toHaveBeenCalledWith({
      url: "chrome-extension://abc/dashboard.html",
    });

    vi.unstubAllGlobals();
  });

  test("popup closes after Go so reopening it shows the rating prompt", async () => {
    vi.stubGlobal("chrome", {
      tabs: {
        query: vi.fn().mockImplementation((_q, cb) => cb([{ id: 1 }])),
        update: vi.fn(),
        create: vi.fn(),
      },
    });

    render(<App />);
    await userEvent.click(screen.getByTestId("search_button"));

    expect(window.close).toHaveBeenCalled();

    vi.unstubAllGlobals();
  });

  test("rating prompt is a modal dialog and can be skipped without rating", async () => {
    localStorage.clear();
    localStorage.setItem("ld:local:lastOpened", JSON.stringify("two-sum"));

    render(<App />);

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveTextContent("Two Sum");

    await userEvent.click(screen.getByTestId("skip_button"));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    const savedKeys = Object.keys(localStorage).filter((k) =>
      k.startsWith("ld:sync:"),
    );
    expect(savedKeys).toEqual([]);
  });

  test("header list selector switches list, hides categories and is remembered", async () => {
    localStorage.clear();
    const { unmount } = render(<App />);

    expect(screen.getByTestId("category_select")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("list_select"));
    await userEvent.click(screen.getByTestId("list_option_blind75"));

    expect(screen.queryByTestId("category_select")).not.toBeInTheDocument();
    expect(localStorage.getItem("ld:sync:activeList")).toBe('"blind75"');
    unmount();

    render(<App />);
    expect(await screen.findByTestId("list_select")).toHaveTextContent(
      "Blind 75",
    );
  });

  test("Go picks a problem from the selected list", async () => {
    localStorage.clear();
    vi.spyOn(Math, "random").mockReturnValue(0);
    const updateMock = vi.fn();
    vi.stubGlobal("chrome", {
      tabs: {
        query: vi.fn().mockImplementation((_q, cb) => cb([{ id: 1 }])),
        update: updateMock,
        create: vi.fn(),
      },
    });

    render(<App />);
    await userEvent.click(screen.getByTestId("list_select"));
    await userEvent.click(screen.getByTestId("list_option_grind169"));
    await userEvent.click(screen.getByTestId("search_button"));

    // first Grind 169 problem
    expect(updateMock).toHaveBeenCalledWith(1, {
      url: "https://leetcode.com/problems/two-sum/description/",
    });

    vi.unstubAllGlobals();
  });

  test("list dropdown closes on Escape and marks the current list", async () => {
    localStorage.clear();
    render(<App />);

    await userEvent.click(screen.getByTestId("list_select"));
    expect(screen.getByTestId("list_option_neetcode150")).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
