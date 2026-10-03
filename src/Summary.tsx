import { ratingFor } from "./puzzles";

export type RoundResult = {
  readonly year: number;
  readonly headline: string;
  readonly best: number;
  readonly score: number;
};

type Props = {
  results: readonly RoundResult[];
  onNewSet: () => void;
  onTodaysSet: () => void;
};

/** End screen: total score, rating and the eight years. */
export function Summary({ results, onNewSet, onTodaysSet }: Props) {
  const score = results.reduce((total, result) => total + result.score, 0);
  const max = results.length * 100;
  const rating = ratingFor(score, max);
  return (
    <div className="panel summary" data-testid="summary">
      <p className="eyebrow">Your score</p>
      <p className="reveal-year">
        {score}
        <span className="score-max"> / {max}</span>
      </p>
      <h2 className="reveal-headline">{rating.label}</h2>
      <p className="reveal-line">{rating.blurb}</p>
      <table className="results">
        <thead>
          <tr>
            <th scope="col">Year</th>
            <th scope="col">What happened</th>
            <th scope="col">Closest</th>
            <th scope="col">Points</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.year}>
              <td className="results-year">{result.year}</td>
              <td>{result.headline}</td>
              <td>{result.best}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="summary-buttons">
        <button className="guess-button" type="button" onClick={onNewSet}>
          Play a new set
        </button>
        <button className="ghost-button" type="button" onClick={onTodaysSet}>
          Play today's set again
        </button>
      </div>
    </div>
  );
}
