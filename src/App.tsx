import { useMemo, useState } from "react";
import { knownCount } from "./elements";
import { type Feedback, GuessPanel } from "./GuessPanel";
import { FamilyLegend, PeriodicTable } from "./PeriodicTable";
import {
  atIndex,
  CLOSE_ENOUGH,
  dailySeed,
  GUESSES_PER_ROUND,
  guessFeedback,
  pickPuzzles,
  roundScore,
} from "./puzzles";
import { Reveal } from "./Reveal";
import { type RoundResult, Summary } from "./Summary";

const DEFAULT_GUESS = 1850;

type Props = {
  /** Fixes the round order; defaults to today's date. */
  seed?: string;
};

/** One game: eight rounds of "which year is this table from?". */
export function App({ seed }: Props = {}) {
  const [activeSeed, setActiveSeed] = useState(() => seed ?? dailySeed());
  const puzzles = useMemo(() => pickPuzzles(activeSeed), [activeSeed]);
  const [round, setRound] = useState(0);
  const [guess, setGuess] = useState(DEFAULT_GUESS);
  const [guesses, setGuesses] = useState<number[]>([]);
  const [roundOver, setRoundOver] = useState(false);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const puzzle = atIndex(puzzles, round);
  const score = results.reduce((total, result) => total + result.score, 0);

  function submit() {
    if (roundOver) return;
    const next = [...guesses, guess];
    setGuesses(next);
    if (
      Math.abs(guess - puzzle.year) <= CLOSE_ENOUGH ||
      next.length >= GUESSES_PER_ROUND
    ) {
      const best = next.reduce(
        (closest, value) =>
          Math.abs(value - puzzle.year) < Math.abs(closest - puzzle.year)
            ? value
            : closest,
        atIndex(next, 0),
      );
      setRoundOver(true);
      setResults((previous) => [
        ...previous,
        {
          year: puzzle.year,
          headline: puzzle.headline,
          best,
          score: roundScore(best - puzzle.year),
        },
      ]);
    }
  }

  function nextRound() {
    if (round + 1 >= puzzles.length) {
      setShowSummary(true);
      return;
    }
    setRound((current) => current + 1);
    setGuesses([]);
    setRoundOver(false);
    setGuess(DEFAULT_GUESS);
  }

  function restart(nextSeed: string) {
    setActiveSeed(nextSeed);
    setRound(0);
    setGuess(DEFAULT_GUESS);
    setGuesses([]);
    setRoundOver(false);
    setResults([]);
    setShowSummary(false);
  }

  const feedback: Feedback[] = guesses.map((value) => ({
    year: value,
    text: guessFeedback(value, puzzle.year),
  }));

  return (
    <div className="app">
      <header className="masthead">
        <h1>Eka</h1>
        <p className="tagline">Guess the year from the periodic table</p>
      </header>

      {showSummary ? (
        <Summary
          results={results}
          onNewSet={() => restart(String(Date.now()))}
          onTodaysSet={() => restart(dailySeed())}
        />
      ) : (
        <>
          <div className="hud">
            <span>
              Round {round + 1} / {puzzles.length}
            </span>
            <span>Score {score}</span>
          </div>
          <p className="clue">
            The table below is the periodic table at one moment in its history:{" "}
            <strong>{knownCount(puzzle.year)}</strong> of the 118 elements had
            been discovered. Which year is it?
          </p>
          <PeriodicTable year={puzzle.year} />
          <FamilyLegend />
          {roundOver ? (
            <Reveal
              puzzle={puzzle}
              best={atIndex(results, results.length - 1).best}
              score={atIndex(results, results.length - 1).score}
              guessCount={guesses.length}
              onNext={nextRound}
              isLast={round + 1 >= puzzles.length}
            />
          ) : (
            <GuessPanel
              value={guess}
              onValueChange={setGuess}
              onSubmit={submit}
              disabled={roundOver}
              guessesLeft={GUESSES_PER_ROUND - guesses.length}
              feedback={feedback}
            />
          )}
          <p className="howto">
            Slide to a year and guess; you will be told whether you are too
            early or too late. Four guesses per round, and the closer you land
            the more of the 100 points you keep.
          </p>
        </>
      )}

      <footer className="footer">
        <p>
          Discovery years follow Wikipedia's{" "}
          <a href="https://en.wikipedia.org/wiki/Timeline_of_chemical_element_discoveries">
            timeline of chemical element discoveries
          </a>
          . The table is always drawn in today's 18-column layout, and a handful
          of years are approximate because the sources disagree.
        </p>
        <p>
          Named after Mendeleev's <em>eka-</em> prefixes: he called the elements
          he had not found yet eka-boron, eka-aluminium and eka-silicon.
        </p>
      </footer>
    </div>
  );
}
