import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { applyRating, today } from "../progress/records";
import { saveProgress } from "../progress/store";
import { badgeText, updateBadge } from "./badge";

describe("badge", () => {
  const setBadgeText = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    setBadgeText.mockClear();
    vi.stubGlobal("chrome", {
      action: { setBadgeText, setBadgeBackgroundColor: vi.fn() },
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  test("badgeText hides zero and caps large counts", () => {
    expect(badgeText(0)).toBe("");
    expect(badgeText(7)).toBe("7");
    expect(badgeText(150)).toBe("99+");
  });

  test("updateBadge shows the number of problems due today", async () => {
    const missed = applyRating(undefined, "missed", today() - 5);
    const notYet = applyRating(undefined, "missed", today());
    await saveProgress({ "two-sum": missed, "lru-cache": notYet }, [
      "two-sum",
      "lru-cache",
    ]);

    await updateBadge();

    expect(setBadgeText).toHaveBeenCalledWith({ text: "1" });
  });
});
