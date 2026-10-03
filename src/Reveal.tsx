import { discoveryLabel, knownCount, recentDiscoveries } from "./elements";
import type { Puzzle } from "./puzzles";

type Props = {
  puzzle: Puzzle;
  best: number;
  score: number;
  guessCount: number;
  onNext: () => void;
  isLast: boolean;
};

/** The payoff card: the true year, what had just been found, and the fact. */
export function Reveal({
  puzzle,
  best,
  score,
  guessCount,
  onNext,
  isLast,
}: Props) {
  const distance = Math.abs(best - puzzle.year);
  const fresh = recentDiscoveries(puzzle.year);
  return (
    <div className="panel reveal" data-testid="reveal">
      <p className="eyebrow">The year was</p>
      <p className="reveal-year">{puzzle.year}</p>
      <h2 className="reveal-headline">{puzzle.headline}</h2>
      <p className="reveal-line">
        {knownCount(puzzle.year)} of the 118 elements were known.
      </p>
      {fresh.length > 0 && (
        <>
          <p className="reveal-sub">New around then</p>
          <ul className="chips" aria-label="Recently discovered elements">
            {fresh.map((element) => (
              <li key={element.z}>
                {element.name}{" "}
                <span className="chip-year">{discoveryLabel(element)}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      <p className="reveal-fact">{puzzle.fact}</p>
      <p className="reveal-score">
        Closest guess {best},{" "}
        {distance === 0 ? "exact" : `${distance} years off`}, {score} points,{" "}
        {guessCount} of 4 guesses.
      </p>
      <button className="guess-button" type="button" onClick={onNext}>
        {isLast ? "See your result" : "Next round"}
      </button>
    </div>
  );
}
