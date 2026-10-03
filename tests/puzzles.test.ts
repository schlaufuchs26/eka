import { describe, expect, test } from "bun:test";
import {
  atIndex,
  CLOSE_ENOUGH,
  dailySeed,
  GUESSES_PER_ROUND,
  guessFeedback,
  hashSeed,
  MAX_ROUND_SCORE,
  mulberry32,
  PUZZLES,
  pickPuzzles,
  ROUNDS,
  ratingFor,
  roundScore,
  YEAR_MAX,
  YEAR_MIN,
} from "../src/puzzles";

describe("roundScore", () => {
  test("pays full points inside the close-enough window", () => {
    expect(roundScore(0)).toBe(MAX_ROUND_SCORE);
    expect(roundScore(CLOSE_ENOUGH)).toBe(MAX_ROUND_SCORE);
    expect(roundScore(-CLOSE_ENOUGH)).toBe(MAX_ROUND_SCORE);
  });

  test("decays with distance and bottoms out at zero", () => {
    expect(roundScore(10)).toBeLessThan(MAX_ROUND_SCORE);
    expect(roundScore(10)).toBeGreaterThan(roundScore(30));
    expect(roundScore(50)).toBe(0);
    expect(roundScore(400)).toBe(0);
  });
});

describe("guessFeedback", () => {
  test("names the direction and the distance", () => {
    expect(guessFeedback(1800, 1869)).toBe("69 years too early");
    expect(guessFeedback(1873, 1869)).toBe("4 years too late");
    expect(guessFeedback(1870, 1869)).toBe("that's it");
    expect(guessFeedback(1869, 1869)).toBe("that's it");
    expect(guessFeedback(1867, 1869)).toBe("that's it");
  });
});

describe("ratingFor", () => {
  test("walks from alchemist to Mendeleev", () => {
    expect(ratingFor(800, 800).label).toBe("Mendeleev");
    expect(ratingFor(660, 800).label).toBe("Periodic law");
    expect(ratingFor(540, 800).label).toBe("Spectroscopist");
    expect(ratingFor(440, 800).label).toBe("Lab chemist");
    expect(ratingFor(280, 800).label).toBe("Student");
    expect(ratingFor(100, 800).label).toBe("Alchemist");
    expect(ratingFor(0, 0).label).toBe("Alchemist");
  });
});

describe("puzzle set", () => {
  test("the pool has enough rounds and sane years", () => {
    expect(PUZZLES.length).toBeGreaterThanOrEqual(ROUNDS);
    for (const puzzle of PUZZLES) {
      expect(puzzle.year).toBeGreaterThanOrEqual(YEAR_MIN);
      expect(puzzle.year).toBeLessThanOrEqual(YEAR_MAX);
      expect(puzzle.fact.length).toBeGreaterThan(80);
    }
  });

  test("the same seed always deals the same rounds", () => {
    const first = pickPuzzles("2026-10-03").map((puzzle) => puzzle.year);
    const second = pickPuzzles("2026-10-03").map((puzzle) => puzzle.year);
    expect(first).toEqual(second);
    expect(first.length).toBe(ROUNDS);
    expect(new Set(first).size).toBe(ROUNDS);
  });

  test("a different seed deals a different order", () => {
    const a = pickPuzzles("seed-a").map((puzzle) => puzzle.year);
    const b = pickPuzzles("seed-b").map((puzzle) => puzzle.year);
    expect(a).not.toEqual(b);
  });

  test("count caps at the pool size", () => {
    expect(pickPuzzles("x", 500).length).toBe(PUZZLES.length);
  });
});

describe("seeding", () => {
  test("hashSeed is stable and spreads", () => {
    expect(hashSeed("abc")).toBe(hashSeed("abc"));
    expect(hashSeed("abc")).not.toBe(hashSeed("abd"));
  });

  test("mulberry32 stays inside [0, 1)", () => {
    const random = mulberry32(42);
    for (let i = 0; i < 50; i += 1) {
      const value = random();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  test("dailySeed formats a date", () => {
    expect(dailySeed(new Date(2026, 9, 3))).toBe("2026-10-03");
    expect(dailySeed(new Date(2026, 0, 9))).toBe("2026-01-09");
  });
});

describe("atIndex", () => {
  test("returns the item and throws past the end", () => {
    expect(atIndex(["a", "b"], 1)).toBe("b");
    expect(() => atIndex([], 0)).toThrow("no item at index 0");
  });
});

describe("constants", () => {
  test("four guesses per round over a 365-year window", () => {
    expect(GUESSES_PER_ROUND).toBe(4);
    expect(YEAR_MAX - YEAR_MIN).toBe(365);
  });
});
