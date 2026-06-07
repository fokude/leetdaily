import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import App from "./App";

describe("App.tsx", () => {
  beforeEach(async () => {
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
      url: "https://github.com/f-okd/leetdaily",
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
});
