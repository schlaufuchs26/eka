import { describe, expect, test } from "bun:test";
import {
  ANCIENT,
  discoveryLabel,
  ELEMENTS,
  knownBy,
  knownCount,
  recentDiscoveries,
  TABLE_COLUMNS,
  tablePosition,
} from "../src/elements";

describe("ELEMENTS", () => {
  test("holds all 118 elements in atomic-number order", () => {
    expect(ELEMENTS.length).toBe(118);
    ELEMENTS.forEach((element, index) => {
      expect(element.z).toBe(index + 1);
      expect(element.symbol.length).toBeGreaterThan(0);
      expect(element.name.length).toBeGreaterThan(0);
    });
    expect(new Set(ELEMENTS.map((element) => element.symbol)).size).toBe(118);
  });

  test("no element is dated in the future of the game window", () => {
    for (const element of ELEMENTS) {
      expect(element.year).toBeLessThanOrEqual(2015);
    }
  });
});

describe("tablePosition", () => {
  test("places the cornerstones of the layout", () => {
    expect(tablePosition(1)).toEqual({ row: 0, col: 0 });
    expect(tablePosition(2)).toEqual({ row: 0, col: 17 });
    expect(tablePosition(3)).toEqual({ row: 1, col: 0 });
    expect(tablePosition(5)).toEqual({ row: 1, col: 12 });
    expect(tablePosition(10)).toEqual({ row: 1, col: 17 });
    expect(tablePosition(11)).toEqual({ row: 2, col: 0 });
    expect(tablePosition(19)).toEqual({ row: 3, col: 0 });
    expect(tablePosition(36)).toEqual({ row: 3, col: 17 });
    expect(tablePosition(37)).toEqual({ row: 4, col: 0 });
    expect(tablePosition(55)).toEqual({ row: 5, col: 0 });
    expect(tablePosition(57)).toEqual({ row: 7, col: 2 });
    expect(tablePosition(71)).toEqual({ row: 7, col: 16 });
    expect(tablePosition(72)).toEqual({ row: 5, col: 3 });
    expect(tablePosition(86)).toEqual({ row: 5, col: 17 });
    expect(tablePosition(89)).toEqual({ row: 8, col: 2 });
    expect(tablePosition(103)).toEqual({ row: 8, col: 16 });
    expect(tablePosition(104)).toEqual({ row: 6, col: 3 });
    expect(tablePosition(118)).toEqual({ row: 6, col: 17 });
  });

  test("gives every element its own cell", () => {
    const seen = new Set<string>();
    for (const element of ELEMENTS) {
      const { row, col } = tablePosition(element.z);
      expect(col).toBeGreaterThanOrEqual(0);
      expect(col).toBeLessThan(TABLE_COLUMNS);
      expect(row).toBeGreaterThanOrEqual(0);
      expect(row).toBeLessThanOrEqual(8);
      seen.add(`${row}:${col}`);
    }
    expect(seen.size).toBe(118);
  });
});

describe("knownBy", () => {
  test("counts the table at three checkpoints", () => {
    expect(knownCount(1650)).toBe(11);
    expect(knownCount(1869)).toBe(63);
    expect(knownCount(2020)).toBe(118);
  });

  test("filters by year and grows monotonically", () => {
    const known = knownBy(1800);
    expect(known.every((element) => element.year <= 1800)).toBe(true);
    expect(knownCount(1800)).toBeLessThan(knownCount(1900));
  });

  test("antiquity counts as known", () => {
    const ancient = ELEMENTS.filter((element) => element.year === ANCIENT);
    expect(ancient.length).toBeGreaterThan(5);
    expect(knownCount(1669)).toBe(12);
  });
});

describe("recentDiscoveries", () => {
  test("lists what had just joined the table", () => {
    const symbols = recentDiscoveries(1898).map((element) => element.symbol);
    expect(symbols).toContain("Ne");
    expect(symbols).toContain("Kr");
    expect(symbols).toContain("Xe");
    expect(symbols).toContain("Po");
    expect(symbols).toContain("Ra");
    expect(symbols).not.toContain("He");
    expect(recentDiscoveries(1898).every((e) => e.year <= 1898)).toBe(true);
  });

  test("honours the span", () => {
    expect(recentDiscoveries(1898, 1).map((e) => e.symbol)).toEqual([
      "Ne",
      "Kr",
      "Xe",
      "Po",
      "Ra",
    ]);
  });
});

describe("discoveryLabel", () => {
  test("spells out antiquity", () => {
    const lead = ELEMENTS.find((element) => element.symbol === "Pb");
    const neon = ELEMENTS.find((element) => element.symbol === "Ne");
    expect(lead && discoveryLabel(lead)).toBe("antiquity");
    expect(neon && discoveryLabel(neon)).toBe("1898");
  });
});
