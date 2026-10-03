import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import { knownCount } from "../src/elements";
import { FamilyLegend, PeriodicTable } from "../src/PeriodicTable";

describe("PeriodicTable", () => {
  test("draws all 118 positions", () => {
    render(<PeriodicTable year={2020} />);

    expect(screen.getAllByTestId("element").length).toBe(118);
  });

  test("only the elements known in that year are filled in", () => {
    render(<PeriodicTable year={1869} />);

    const known = screen
      .getAllByTestId("element")
      .filter((cell) => cell.getAttribute("data-known") === "yes");
    expect(known.length).toBe(knownCount(1869));
    expect(
      screen.getByTestId("periodic-table").getAttribute("aria-label"),
    ).toContain("63 of 118 elements");
  });

  test("a table from 1650 is nearly empty", () => {
    render(<PeriodicTable year={1650} />);

    const known = screen
      .getAllByTestId("element")
      .filter((cell) => cell.getAttribute("data-known") === "yes");
    expect(known.length).toBe(11);
    expect(screen.getAllByTestId("element")[5]?.getAttribute("data-z")).toBe(
      "6",
    );
  });
});

describe("FamilyLegend", () => {
  test("lists every family", () => {
    render(<FamilyLegend />);

    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(10);
    expect(screen.getByText("noble gas")).toBeInTheDocument();
    expect(screen.getByText("lanthanide")).toBeInTheDocument();
  });
});
