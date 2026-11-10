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
});
