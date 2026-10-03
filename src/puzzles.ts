/**
 * Round content and scoring for Eka.
 *
 * Each puzzle is a year of the periodic table's history plus the story of what
 * had just been discovered then. The facts are the payoff of a round: they are
 * checked against Wikipedia's "Timeline of chemical element discoveries" and
 * the standard histories (Weeks, "Discovery of the Elements").
 */

export type Puzzle = {
  /** The mystery year the player has to find. */
  readonly year: number;
  /** Short label for the reveal card. */
  readonly headline: string;
  /** What the table looked like and what had just happened. */
  readonly fact: string;
};

/** Years the game can ask about, spread across the table's history. */
export const PUZZLES: readonly Puzzle[] = [
  {
    year: 1669,
    headline: "The first named discoverer",
    fact: "Hennig Brand, chasing gold out of urine, boiled down thousands of litres of it and got a waxy substance that glowed in the dark: phosphorus. Eleven elements were known, and Brand was the first person we can name as the discoverer of one.",
  },
  {
    year: 1750,
    headline: "Cobalt and platinum",
    fact: "Two metals had just joined the list: cobalt, named after the kobolds blamed for spoiling Saxon silver ore, and platinum, shipped from South America. About fifteen elements were known, and chemists still believed in phlogiston.",
  },
  {
    year: 1774,
    headline: "The gases arrive",
    fact: "Carl Wilhelm Scheele and Joseph Priestley each isolated oxygen, and Scheele also got chlorine. Antoine Lavoisier would soon argue that these gases are elements and that air is a mixture, not a substance.",
  },
  {
    year: 1789,
    headline: "Lavoisier's list",
    fact: "Antoine Lavoisier published a table of 33 simple substances, the first modern list of elements. In the same year Martin Heinrich Klaproth isolated uranium and zirconium, and phlogiston was on its way out.",
  },
  {
    year: 1808,
    headline: "Davy's battery",
    fact: "Humphry Davy ran electric current through molten potash and soda and pulled out potassium and sodium (1807), then calcium, barium and strontium (1808). Boron came out of boric acid in the same year.",
  },
  {
    year: 1817,
    headline: "Three in one year",
    fact: "Lithium, cadmium and selenium all arrived in 1817. Lithium hid inside a mineral that looked like sodium; selenium turned up in the soot of a sulfuric acid works.",
  },
  {
    year: 1826,
    headline: "Bromine",
    fact: "Antoine Balard isolated bromine from seaweed ash. Silicon (1824) and aluminium (1825) had just been won from their compounds, and the list stood at about fifty elements.",
  },
  {
    year: 1839,
    headline: "The rare earths begin",
    fact: "Carl Gustaf Mosander pulled lanthanum out of cerium nitrate, six years after cerium itself had been separated. The rare earths turned into a tangle that took a century to sort out.",
  },
  {
    year: 1860,
    headline: "The spectroscope",
    fact: "Robert Bunsen and Gustav Kirchhoff read new elements straight off their flame colours: caesium in 1860, rubidium in 1861. Spectroscopy became the discovery machine of the century.",
  },
  {
    year: 1869,
    headline: "Mendeleev's table",
    fact: "Dmitri Mendeleev arranged the 63 known elements by atomic weight in March 1869 and left gaps for the ones nobody had found. Helium had been spotted in the Sun's spectrum a year earlier.",
  },
  {
    year: 1879,
    headline: "Mendeleev's predictions land",
    fact: "Scandium (1879) turned out to be Mendeleev's eka-boron, just as gallium (1875) had been his eka-aluminium and germanium (1886) would be his eka-silicon. He had described their properties before anyone held them.",
  },
  {
    year: 1894,
    headline: "Argon",
    fact: "Lord Rayleigh noticed that nitrogen from air was heavier than nitrogen from ammonia. With William Ramsay he traced the difference to argon: the first noble gas, and the first element found by a measurement that did not add up.",
  },
  {
    year: 1898,
    headline: "Five elements in one year",
    fact: "Ramsay and Morris Travers distilled neon, krypton and xenon out of liquid air; Marie and Pierre Curie pulled polonium and radium out of pitchblende. No other year added as many elements.",
  },
  {
    year: 1901,
    headline: "Europium",
    fact: "Eugène-Anatole Demarçay separated europium from samarium, closing the last rare-earth gap in the table's second row.",
  },
  {
    year: 1913,
    headline: "Atomic number",
    fact: "Kasimir Fajans and Oswald Göhring identified protactinium. In the same year Henry Moseley showed that an element's X-ray spectrum follows its atomic number and not its weight, which fixed the order of the table for good.",
  },
  {
    year: 1925,
    headline: "Rhenium, the last stable one",
    fact: "Walter Noddack, Ida Tacke and Otto Berg found rhenium in a Norwegian ore. It was the last stable element to be discovered; getting a gram of it took 660 kilograms of ore.",
  },
  {
    year: 1937,
    headline: "Technetium",
    fact: "Emilio Segrè and Carlo Perrier found technetium in a discarded molybdenum foil from a cyclotron: the first element made by humans, and the gap Mendeleev had called eka-manganese.",
  },
  {
    year: 1940,
    headline: "Past uranium",
    fact: "Edwin McMillan and Philip Abelson made neptunium, Glenn Seaborg's team followed with plutonium, and astatine was made in the same year. The table now ran past uranium.",
  },
  {
    year: 1945,
    headline: "Promethium",
    fact: "Promethium, the last rare earth, was found among the fission products of a uranium reactor at Oak Ridge. It has no stable isotope, which is why nobody had found it in nature.",
  },
  {
    year: 1952,
    headline: "Out of the bomb",
    fact: "Einsteinium and fermium were identified in the fallout of the first hydrogen bomb test, Ivy Mike. Both were named after physicists within weeks.",
  },
  {
    year: 1961,
    headline: "A few atoms at a time",
    fact: "Albert Ghiorso's team made lawrencium by firing boron nuclei at californium. At that scale an element is a handful of atoms that live for seconds, counted one decay at a time.",
  },
  {
    year: 1974,
    headline: "Seaborgium",
    fact: "Berkeley made element 106 and named it after Glenn Seaborg, the first element named after a living person. Dubna had a competing claim, and the naming fights ran into the 1990s.",
  },
  {
    year: 1996,
    headline: "Copernicium",
    fact: "At Darmstadt, zinc ions fired at a lead target produced element 112, one atom at a time. It was named after Copernicus once the discovery was confirmed.",
  },
  {
    year: 2010,
    headline: "The row is complete",
    fact: "Tennessine, made by a Russian-American team, filled the last gap in the halogen column. The seventh row of the table was complete, 141 years after Mendeleev's first table.",
  },
];

/** Number of rounds in a game. */
export const ROUNDS = 8;

/** Guesses a player gets per round. */
export const GUESSES_PER_ROUND = 4;

/** A guess this close to the true year ends the round. */
export const CLOSE_ENOUGH = 2;

/** Range of the year slider. */
export const YEAR_MIN = 1650;
export const YEAR_MAX = 2015;

/** Points a perfect round is worth. */
export const MAX_ROUND_SCORE = 100;

/** Score reaches zero this many years past CLOSE_ENOUGH. */
const DECAY_YEARS = 48;

/** Round score for a guess `delta` years away from the truth. */
export function roundScore(delta: number): number {
  const distance = Math.abs(delta);
  if (distance <= CLOSE_ENOUGH) return MAX_ROUND_SCORE;
  const score = MAX_ROUND_SCORE * (1 - (distance - CLOSE_ENOUGH) / DECAY_YEARS);
  return Math.max(0, Math.round(score));
}

/** "too early by 39 years" / "too late by 4 years" / "that's it". */
export function guessFeedback(guess: number, target: number): string {
  const delta = guess - target;
  if (Math.abs(delta) <= CLOSE_ENOUGH) return "that's it";
  const years = Math.abs(delta);
  const unit = years === 1 ? "year" : "years";
  return delta < 0 ? `${years} ${unit} too early` : `${years} ${unit} too late`;
}

export type Rating = { readonly label: string; readonly blurb: string };

/** End-of-game rating from the share of the maximum score. */
export function ratingFor(score: number, max: number): Rating {
  const share = max > 0 ? score / max : 0;
  if (share >= 0.95)
    return {
      label: "Mendeleev",
      blurb: "You could have drawn the gaps yourself.",
    };
  if (share >= 0.8)
    return { label: "Periodic law", blurb: "The table's timeline is yours." };
  if (share >= 0.65)
    return {
      label: "Spectroscopist",
      blurb: "You read the table like a flame spectrum.",
    };
  if (share >= 0.5)
    return {
      label: "Lab chemist",
      blurb: "Solid instincts, a few blind spots.",
    };
  if (share >= 0.3)
    return { label: "Student", blurb: "The rough eras are in place." };
  return {
    label: "Alchemist",
    blurb: "Everything glows and nothing is labelled.",
  };
}

/** FNV-1a hash, so a date string turns into a stable seed. */
export function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Small deterministic PRNG (mulberry32). */
export function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A stable set of rounds for a seed, in shuffled order. */
export function pickPuzzles(seed: string, count = ROUNDS): Puzzle[] {
  const random = mulberry32(hashSeed(seed));
  const pool = [...PUZZLES];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const a = pool[i];
    const b = pool[j];
    if (a && b) {
      pool[i] = b;
      pool[j] = a;
    }
  }
  return pool.slice(0, Math.min(count, pool.length));
}

/** Today's date as a seed, so the default game is the same for everyone. */
export function dailySeed(now: Date = new Date()): string {
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/** Indexed access that fails loudly instead of handing back `undefined`. */
export function atIndex<T>(list: readonly T[], index: number): T {
  const value = list[index];
  if (value === undefined) throw new Error(`no item at index ${index}`);
  return value;
}
