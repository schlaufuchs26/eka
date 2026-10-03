import { describe, expect, test } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import { App } from "../src/App";
import { knownCount } from "../src/elements";
import { pickPuzzles, ROUNDS } from "../src/puzzles";

const SEED = "test-seed";

function guess(year: number) {
  fireEvent.change(screen.getByLabelText("Guess year"), {
    target: { value: String(year) },
  });
  fireEvent.click(screen.getByRole("button", { name: "Guess" }));
}

function advance() {
  fireEvent.click(
    screen.getByRole("button", { name: /Next round|See your result/ }),
  );
}

function playPerfectGame(puzzles: { year: number }[]) {
  for (const puzzle of puzzles) {
    guess(puzzle.year);
    advance();
  }
}

describe("App", () => {
  test("opens on round 1 with the clue and the table", () => {
    const puzzles = pickPuzzles(SEED);
    render(<App seed={SEED} />);

    expect(screen.getByRole("heading", { name: "Eka" })).toBeInTheDocument();
    expect(screen.getByText("Round 1 / 8")).toBeInTheDocument();
    expect(screen.getByText("Score 0")).toBeInTheDocument();
    expect(
      screen.getByText(String(knownCount(puzzles[0]?.year ?? 0))),
    ).toBeInTheDocument();
    expect(screen.getByTestId("periodic-table")).toBeInTheDocument();
    expect(screen.getByText("4 guesses left")).toBeInTheDocument();
  });

  test("tells the player how far off a guess is", () => {
    const target = pickPuzzles(SEED)[0]?.year ?? 0;
    render(<App seed={SEED} />);

    guess(target - 20);

    expect(screen.getByText("20 years too early")).toBeInTheDocument();
    expect(screen.getByText("3 guesses left")).toBeInTheDocument();
    expect(screen.queryByTestId("reveal")).toBeNull();
  });

  test("the slider and the number box stay in sync", () => {
    render(<App seed={SEED} />);

    fireEvent.change(screen.getByLabelText("Your guess"), {
      target: { value: "1900" },
    });
    expect(
      (screen.getByLabelText("Guess year") as HTMLInputElement).value,
    ).toBe("1900");
    expect(screen.getByText("1900")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Guess year"), {
      target: { value: "3000" },
    });
    expect(
      (screen.getByLabelText("Guess year") as HTMLInputElement).value,
    ).toBe("2015");
    fireEvent.change(screen.getByLabelText("Guess year"), {
      target: { value: "1200" },
    });
    expect(
      (screen.getByLabelText("Guess year") as HTMLInputElement).value,
    ).toBe("1650");
  });

  test("a guess inside the window reveals the year and the story", () => {
    const puzzle = pickPuzzles(SEED)[0];
    render(<App seed={SEED} />);
    if (!puzzle) throw new Error("no puzzle");

    guess(puzzle.year);

    expect(screen.getByTestId("reveal")).toBeInTheDocument();
    expect(
      screen.getByText(String(puzzle.year), { selector: ".reveal-year" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(puzzle.headline, { selector: ".reveal-headline" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`^${knownCount(puzzle.year)} of the 118`)),
    ).toBeInTheDocument();
    expect(screen.getByText(/exact, 100 points/)).toBeInTheDocument();

    advance();
    expect(screen.getByText("Round 2 / 8")).toBeInTheDocument();
    expect(screen.getByText("4 guesses left")).toBeInTheDocument();
  });

  test("the fourth guess ends the round even when it is far off", () => {
    const target = pickPuzzles(SEED)[0]?.year ?? 0;
    render(<App seed={SEED} />);

    guess(target - 40);
    guess(target - 30);
    guess(target - 20);
    expect(screen.queryByTestId("reveal")).toBeNull();
    guess(target - 10);

    expect(screen.getByTestId("reveal")).toBeInTheDocument();
    expect(
      screen.getByText(/10 years off, 83 points, 4 of 4 guesses/),
    ).toBeInTheDocument();
  });

  test("eight perfect rounds end on the summary, which can deal a new set", () => {
    const puzzles = pickPuzzles(SEED);
    render(<App seed={SEED} />);

    playPerfectGame(puzzles);

    expect(screen.getByTestId("summary")).toBeInTheDocument();
    expect(screen.getByText("Mendeleev")).toBeInTheDocument();
    expect(screen.getByText("800")).toBeInTheDocument();
    expect(screen.getAllByText("100").length).toBe(ROUNDS);

    fireEvent.click(screen.getByRole("button", { name: "Play a new set" }));
    expect(screen.getByText("Round 1 / 8")).toBeInTheDocument();
    expect(screen.getByText("Score 0")).toBeInTheDocument();
  });

  test("today's set can be replayed after the summary", () => {
    const puzzles = pickPuzzles(SEED);
    render(<App seed={SEED} />);

    playPerfectGame(puzzles);

    fireEvent.click(
      screen.getByRole("button", { name: "Play today's set again" }),
    );
    expect(screen.getByText("Round 1 / 8")).toBeInTheDocument();
  });
});
