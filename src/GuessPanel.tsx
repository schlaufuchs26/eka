import { YEAR_MAX, YEAR_MIN } from "./puzzles";

export type Feedback = { readonly year: number; readonly text: string };

type Props = {
  value: number;
  onValueChange: (year: number) => void;
  onSubmit: () => void;
  disabled: boolean;
  guessesLeft: number;
  feedback: readonly Feedback[];
};

/** Year slider, guess button and the running list of "too early / too late". */
export function GuessPanel({
  value,
  onValueChange,
  onSubmit,
  disabled,
  guessesLeft,
  feedback,
}: Props) {
  return (
    <div className="panel">
      <div className="slider-row">
        <label className="slider-label" htmlFor="year-range">
          Your guess
        </label>
        <output className="year-readout">{value}</output>
      </div>
      <input
        id="year-range"
        className="range"
        type="range"
        min={YEAR_MIN}
        max={YEAR_MAX}
        step={1}
        value={value}
        disabled={disabled}
        onChange={(event) => onValueChange(Number(event.target.value))}
      />
      <div className="controls">
        <input
          className="year-input"
          type="number"
          min={YEAR_MIN}
          max={YEAR_MAX}
          step={1}
          value={value}
          disabled={disabled}
          aria-label="Guess year"
          onChange={(event) => {
            const next = Number(event.target.value);
            if (Number.isFinite(next)) {
              onValueChange(Math.min(YEAR_MAX, Math.max(YEAR_MIN, next)));
            }
          }}
        />
        <button
          className="guess-button"
          type="button"
          onClick={onSubmit}
          disabled={disabled}
        >
          Guess
        </button>
        <span className="guesses-left">
          {guessesLeft === 1 ? "1 guess left" : `${guessesLeft} guesses left`}
        </span>
      </div>
      <ul className="feedback" aria-label="Your guesses">
        {feedback.map((entry) => (
          <li key={`${entry.year}-${entry.text}`}>
            <span className="feedback-year">{entry.year}</span>
            <span className="feedback-text">{entry.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
