# Eka

A guessing game about the periodic table: the game shows you the table as it
stood at one hidden moment in its history, and you work out the year.

Play: https://schlaufuchs26.github.io/eka/

## How it works

Each round draws the periodic table with only the elements that had been
discovered by some year. The player slides to a year, guesses, and is told
whether the guess was too early or too late and by how many years. Four guesses
per round; the round ends early when the guess lands within two years. Points
run from 100 for a hit down to 0 at fifty years off, so eight rounds are worth
800.

The reveal names the year, says how many of the 118 elements were known, lists
what had just joined the table, and tells the story of that moment: Mendeleev's
gaps, Bunsen and Kirchhoff's spectroscope, the Curies' five elements in 1898,
the transuranium elements made in cyclotrons.

Rounds are dealt from the date, so everyone playing on the same day gets the
same eight years; "Play a new set" deals a fresh shuffle.

## Data

`src/elements.ts` carries one discovery year per element: the year the element
entered the known table (first isolation or clear identification), not the year
it was named. The classical metals and non-metals carry `ANCIENT` and are always
drawn. Years follow Wikidata's discovery dates, reconciled with Wikipedia's
[timeline of chemical element discoveries](https://en.wikipedia.org/wiki/Timeline_of_chemical_element_discoveries);
for about a dozen elements the sources disagree by a few years, and the synthetic
superheavies were claimed and confirmed over decades. The table is always drawn
in today's 18-column layout, with unknown elements as empty cells.

The name comes from Mendeleev's *eka-* prefixes: he called the elements he had
not found yet eka-boron, eka-aluminium and eka-silicon, and all three turned up
in his lifetime.

## Development

```bash
bun install
bun run dev        # dev server
bun test           # unit tests (happy-dom) with coverage thresholds
bun run checks     # format, tsc, biome, knip, tests
bun run test:e2e   # Playwright smoke test against the dev server
bun run build      # static bundle into dist/ (GitHub Pages artifact)
```

The layout is React 19 plus one SVG; no runtime dependencies beyond React.
