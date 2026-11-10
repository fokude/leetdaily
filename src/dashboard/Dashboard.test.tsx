import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { applyRating, today } from "../progress/records";
import { loadProgress, saveProgress } from "../progress/store";
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  test("shows solved count for the selected list", async () => {
    await saveProgress(
      { "two-sum": applyRating(undefined, "nailed", today()) },
      ["two-sum"],
    );
    render(<Dashboard />);

    expect(await screen.findByTestId("list_progress")).toHaveTextContent(
      "1 / 150 solved",
    );

    await userEvent.click(screen.getByTestId("tab_blind75"));
    expect(screen.getByTestId("list_progress")).toHaveTextContent(
      "1 / 75 solved",
    );
  });

  test("ticking a problem marks the row solved and saves it", async () => {
    render(<Dashboard />);

    await userEvent.click(await screen.findByTestId("solved_two-sum"));

    expect(screen.getByTestId("row_two-sum")).toHaveClass("solved");
    expect((await loadProgress())["two-sum"].solved).toBe(true);
  });

  test("adding a problem to the revisit queue lists it in the queue table", async () => {
    render(<Dashboard />);

    await userEvent.click(await screen.findByTestId("queue_two-sum"));

    const table = await screen.findByTestId("queue_table");
    expect(within(table).getByText("Two Sum")).toBeInTheDocument();
    expect((await loadProgress())["two-sum"].box).toBe(1);
  });

  test("reset queue keeps solved marks but empties the queue", async () => {
    window.confirm = vi.fn().mockReturnValue(true);
    await saveProgress(
      {
        "two-sum": applyRating(undefined, "shaky", today()),
        "lru-cache": applyRating(undefined, "missed", today()),
      },
      ["two-sum", "lru-cache"],
    );
    render(<Dashboard />);

    await userEvent.click(await screen.findByTestId("reset_queue"));

    const saved = await loadProgress();
    expect(saved["two-sum"]).toMatchObject({ solved: true, box: 0 });
    expect(saved["lru-cache"]).toBeUndefined();
  });

  test("reset list progress clears solved marks but keeps the schedule", async () => {
    window.confirm = vi.fn().mockReturnValue(true);
    await saveProgress(
      {
        "two-sum": applyRating(undefined, "nailed", today()),
        "valid-anagram": applyRating(undefined, "shaky", today()),
      },
      ["two-sum", "valid-anagram"],
    );
    render(<Dashboard />);

    await userEvent.click(await screen.findByTestId("reset_list"));

    const saved = await loadProgress();
    expect(saved["two-sum"]).toBeUndefined();
    expect(saved["valid-anagram"]).toMatchObject({ solved: false, box: 1 });
  });

  test("declining the confirmation changes nothing", async () => {
    window.confirm = vi.fn().mockReturnValue(false);
    await saveProgress(
      { "two-sum": applyRating(undefined, "nailed", today()) },
      ["two-sum"],
    );
    render(<Dashboard />);

    await userEvent.click(await screen.findByTestId("reset_list"));

    expect((await loadProgress())["two-sum"].solved).toBe(true);
  });

  test("creates a custom list from pasted urls and shows its progress", async () => {
    render(<Dashboard />);

    await userEvent.click(await screen.findByTestId("new_list_button"));
    await userEvent.type(screen.getByTestId("list_name"), "My list");
    await userEvent.type(
      screen.getByTestId("list_input"),
      "https://leetcode.com/problems/two-sum/{enter}lru-cache{enter}Not A Slug",
    );
    expect(screen.getByTestId("list_preview")).toHaveTextContent(
      "2 problems found, 1 skipped",
    );

    await userEvent.click(screen.getByTestId("create_list_button"));

    expect(await screen.findByTestId("list_progress")).toHaveTextContent(
      "0 / 2 solved",
    );
    expect(screen.getByTestId("row_lru-cache")).toBeInTheDocument();
  });

  test("deleting a custom list keeps problem progress", async () => {
    window.confirm = vi.fn().mockReturnValue(true);
    await saveProgress(
      { "two-sum": applyRating(undefined, "nailed", today()) },
      ["two-sum"],
    );
    render(<Dashboard />);

    await userEvent.click(await screen.findByTestId("new_list_button"));
    await userEvent.type(screen.getByTestId("list_name"), "Temp");
    await userEvent.type(screen.getByTestId("list_input"), "two-sum");
    await userEvent.click(screen.getByTestId("create_list_button"));
    await userEvent.click(await screen.findByTestId("delete_list"));

    expect(await screen.findByTestId("list_progress")).toHaveTextContent(
      "/ 150 solved",
    );
    expect((await loadProgress())["two-sum"].solved).toBe(true);
  });

  test("opens on the saved list and saves the list you switch to", async () => {
    localStorage.setItem("ld:sync:activeList", JSON.stringify("blind75"));
    render(<Dashboard />);

    expect(await screen.findByTestId("list_progress")).toHaveTextContent(
      "/ 75 solved",
    );

    await userEvent.click(screen.getByTestId("tab_grind169"));

    expect(localStorage.getItem("ld:sync:activeList")).toBe('"grind169"');
  });

  test("theme toggle switches the dashboard to dark and saves it", async () => {
    render(<Dashboard />);

    await userEvent.click(await screen.findByTestId("theme_toggle"));

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  test("header shows the current streak and the best", async () => {
    const day = today();
    localStorage.setItem(
      "ld:sync:streak",
      JSON.stringify({ current: 3, best: 7, last: day }),
    );
    render(<Dashboard />);

    expect(
      await screen.findByText(/3 day streak \(best 7\)/),
    ).toBeInTheDocument();
  });
});
