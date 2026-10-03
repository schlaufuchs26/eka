// Element discovery data for Eka.
//
// `year` is the year the element entered the known table (first isolation or
// clear identification), not the year it was named. The classical metals and
// non-metals carry ANCIENT. Years are approximate: for a dozen elements the
// literature disagrees by a few years, and the synthetic superheavies were
// claimed and confirmed over decades. Source: Wikidata P575, reconciled with
// Wikipedia's "Timeline of chemical element discoveries" (fetched 2026-10-03).

/** Marker for elements known since antiquity (always in the table). */
export const ANCIENT = -3000;

export type ElementFamily =
  | "alkali"
  | "alkaline"
  | "transition"
  | "post-transition"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble"
  | "lanthanide"
  | "actinide";

export type Element = {
  readonly z: number;
  readonly symbol: string;
  readonly name: string;
  readonly year: number;
  readonly family: ElementFamily;
};

/** The 118 elements, ordered by atomic number. */
export const ELEMENTS: readonly Element[] = [
  { z: 1, symbol: "H", name: "Hydrogen", year: 1766, family: "nonmetal" },
  { z: 2, symbol: "He", name: "Helium", year: 1868, family: "noble" },
  { z: 3, symbol: "Li", name: "Lithium", year: 1817, family: "alkali" },
  { z: 4, symbol: "Be", name: "Beryllium", year: 1798, family: "alkaline" },
  { z: 5, symbol: "B", name: "Boron", year: 1808, family: "metalloid" },
  { z: 6, symbol: "C", name: "Carbon", year: -3000, family: "nonmetal" },
  { z: 7, symbol: "N", name: "Nitrogen", year: 1772, family: "nonmetal" },
  { z: 8, symbol: "O", name: "Oxygen", year: 1774, family: "nonmetal" },
  { z: 9, symbol: "F", name: "Fluorine", year: 1886, family: "halogen" },
  { z: 10, symbol: "Ne", name: "Neon", year: 1898, family: "noble" },
  { z: 11, symbol: "Na", name: "Sodium", year: 1807, family: "alkali" },
  { z: 12, symbol: "Mg", name: "Magnesium", year: 1755, family: "alkaline" },
  {
    z: 13,
    symbol: "Al",
    name: "Aluminium",
    year: 1825,
    family: "post-transition",
  },
  { z: 14, symbol: "Si", name: "Silicon", year: 1824, family: "metalloid" },
  { z: 15, symbol: "P", name: "Phosphorus", year: 1669, family: "nonmetal" },
  { z: 16, symbol: "S", name: "Sulfur", year: -3000, family: "nonmetal" },
  { z: 17, symbol: "Cl", name: "Chlorine", year: 1774, family: "halogen" },
  { z: 18, symbol: "Ar", name: "Argon", year: 1894, family: "noble" },
  { z: 19, symbol: "K", name: "Potassium", year: 1807, family: "alkali" },
  { z: 20, symbol: "Ca", name: "Calcium", year: 1808, family: "alkaline" },
  { z: 21, symbol: "Sc", name: "Scandium", year: 1879, family: "transition" },
  { z: 22, symbol: "Ti", name: "Titanium", year: 1791, family: "transition" },
  { z: 23, symbol: "V", name: "Vanadium", year: 1801, family: "transition" },
  { z: 24, symbol: "Cr", name: "Chromium", year: 1797, family: "transition" },
  { z: 25, symbol: "Mn", name: "Manganese", year: 1774, family: "transition" },
  { z: 26, symbol: "Fe", name: "Iron", year: -5000, family: "transition" },
  { z: 27, symbol: "Co", name: "Cobalt", year: 1735, family: "transition" },
  { z: 28, symbol: "Ni", name: "Nickel", year: 1751, family: "transition" },
  { z: 29, symbol: "Cu", name: "Copper", year: -7000, family: "transition" },
  { z: 30, symbol: "Zn", name: "Zinc", year: 1746, family: "transition" },
  {
    z: 31,
    symbol: "Ga",
    name: "Gallium",
    year: 1875,
    family: "post-transition",
  },
  { z: 32, symbol: "Ge", name: "Germanium", year: 1886, family: "metalloid" },
  { z: 33, symbol: "As", name: "Arsenic", year: 1250, family: "metalloid" },
  { z: 34, symbol: "Se", name: "Selenium", year: 1817, family: "nonmetal" },
  { z: 35, symbol: "Br", name: "Bromine", year: 1826, family: "halogen" },
  { z: 36, symbol: "Kr", name: "Krypton", year: 1898, family: "noble" },
  { z: 37, symbol: "Rb", name: "Rubidium", year: 1861, family: "alkali" },
  { z: 38, symbol: "Sr", name: "Strontium", year: 1790, family: "alkaline" },
  { z: 39, symbol: "Y", name: "Yttrium", year: 1794, family: "transition" },
  { z: 40, symbol: "Zr", name: "Zirconium", year: 1789, family: "transition" },
  { z: 41, symbol: "Nb", name: "Niobium", year: 1801, family: "transition" },
  { z: 42, symbol: "Mo", name: "Molybdenum", year: 1778, family: "transition" },
  { z: 43, symbol: "Tc", name: "Technetium", year: 1937, family: "transition" },
  { z: 44, symbol: "Ru", name: "Ruthenium", year: 1844, family: "transition" },
  { z: 45, symbol: "Rh", name: "Rhodium", year: 1803, family: "transition" },
  { z: 46, symbol: "Pd", name: "Palladium", year: 1803, family: "transition" },
  { z: 47, symbol: "Ag", name: "Silver", year: -5000, family: "transition" },
  { z: 48, symbol: "Cd", name: "Cadmium", year: 1817, family: "transition" },
  {
    z: 49,
    symbol: "In",
    name: "Indium",
    year: 1863,
    family: "post-transition",
  },
  { z: 50, symbol: "Sn", name: "Tin", year: -3000, family: "post-transition" },
  { z: 51, symbol: "Sb", name: "Antimony", year: -3000, family: "metalloid" },
  { z: 52, symbol: "Te", name: "Tellurium", year: 1783, family: "metalloid" },
  { z: 53, symbol: "I", name: "Iodine", year: 1811, family: "halogen" },
  { z: 54, symbol: "Xe", name: "Xenon", year: 1898, family: "noble" },
  { z: 55, symbol: "Cs", name: "Caesium", year: 1860, family: "alkali" },
  { z: 56, symbol: "Ba", name: "Barium", year: 1808, family: "alkaline" },
  { z: 57, symbol: "La", name: "Lanthanum", year: 1839, family: "lanthanide" },
  { z: 58, symbol: "Ce", name: "Cerium", year: 1803, family: "lanthanide" },
  {
    z: 59,
    symbol: "Pr",
    name: "Praseodymium",
    year: 1885,
    family: "lanthanide",
  },
  { z: 60, symbol: "Nd", name: "Neodymium", year: 1885, family: "lanthanide" },
  { z: 61, symbol: "Pm", name: "Promethium", year: 1945, family: "lanthanide" },
  { z: 62, symbol: "Sm", name: "Samarium", year: 1879, family: "lanthanide" },
  { z: 63, symbol: "Eu", name: "Europium", year: 1901, family: "lanthanide" },
  { z: 64, symbol: "Gd", name: "Gadolinium", year: 1880, family: "lanthanide" },
  { z: 65, symbol: "Tb", name: "Terbium", year: 1843, family: "lanthanide" },
  { z: 66, symbol: "Dy", name: "Dysprosium", year: 1886, family: "lanthanide" },
  { z: 67, symbol: "Ho", name: "Holmium", year: 1878, family: "lanthanide" },
  { z: 68, symbol: "Er", name: "Erbium", year: 1843, family: "lanthanide" },
  { z: 69, symbol: "Tm", name: "Thulium", year: 1879, family: "lanthanide" },
  { z: 70, symbol: "Yb", name: "Ytterbium", year: 1878, family: "lanthanide" },
  { z: 71, symbol: "Lu", name: "Lutetium", year: 1907, family: "lanthanide" },
  { z: 72, symbol: "Hf", name: "Hafnium", year: 1923, family: "transition" },
  { z: 73, symbol: "Ta", name: "Tantalum", year: 1802, family: "transition" },
  { z: 74, symbol: "W", name: "Tungsten", year: 1783, family: "transition" },
  { z: 75, symbol: "Re", name: "Rhenium", year: 1925, family: "transition" },
  { z: 76, symbol: "Os", name: "Osmium", year: 1804, family: "transition" },
  { z: 77, symbol: "Ir", name: "Iridium", year: 1803, family: "transition" },
  { z: 78, symbol: "Pt", name: "Platinum", year: 1735, family: "transition" },
  { z: 79, symbol: "Au", name: "Gold", year: -6000, family: "transition" },
  { z: 80, symbol: "Hg", name: "Mercury", year: -3000, family: "transition" },
  {
    z: 81,
    symbol: "Tl",
    name: "Thallium",
    year: 1861,
    family: "post-transition",
  },
  { z: 82, symbol: "Pb", name: "Lead", year: -3000, family: "post-transition" },
  {
    z: 83,
    symbol: "Bi",
    name: "Bismuth",
    year: 1753,
    family: "post-transition",
  },
  {
    z: 84,
    symbol: "Po",
    name: "Polonium",
    year: 1898,
    family: "post-transition",
  },
  { z: 85, symbol: "At", name: "Astatine", year: 1940, family: "halogen" },
  { z: 86, symbol: "Rn", name: "Radon", year: 1900, family: "noble" },
  { z: 87, symbol: "Fr", name: "Francium", year: 1939, family: "alkali" },
  { z: 88, symbol: "Ra", name: "Radium", year: 1898, family: "alkaline" },
  { z: 89, symbol: "Ac", name: "Actinium", year: 1899, family: "actinide" },
  { z: 90, symbol: "Th", name: "Thorium", year: 1829, family: "actinide" },
  { z: 91, symbol: "Pa", name: "Protactinium", year: 1913, family: "actinide" },
  { z: 92, symbol: "U", name: "Uranium", year: 1789, family: "actinide" },
  { z: 93, symbol: "Np", name: "Neptunium", year: 1940, family: "actinide" },
  { z: 94, symbol: "Pu", name: "Plutonium", year: 1941, family: "actinide" },
  { z: 95, symbol: "Am", name: "Americium", year: 1944, family: "actinide" },
  { z: 96, symbol: "Cm", name: "Curium", year: 1944, family: "actinide" },
  { z: 97, symbol: "Bk", name: "Berkelium", year: 1949, family: "actinide" },
  { z: 98, symbol: "Cf", name: "Californium", year: 1950, family: "actinide" },
  { z: 99, symbol: "Es", name: "Einsteinium", year: 1952, family: "actinide" },
  { z: 100, symbol: "Fm", name: "Fermium", year: 1952, family: "actinide" },
  { z: 101, symbol: "Md", name: "Mendelevium", year: 1955, family: "actinide" },
  { z: 102, symbol: "No", name: "Nobelium", year: 1966, family: "actinide" },
  { z: 103, symbol: "Lr", name: "Lawrencium", year: 1961, family: "actinide" },
  {
    z: 104,
    symbol: "Rf",
    name: "Rutherfordium",
    year: 1964,
    family: "transition",
  },
  { z: 105, symbol: "Db", name: "Dubnium", year: 1968, family: "transition" },
  {
    z: 106,
    symbol: "Sg",
    name: "Seaborgium",
    year: 1974,
    family: "transition",
  },
  { z: 107, symbol: "Bh", name: "Bohrium", year: 1981, family: "transition" },
  { z: 108, symbol: "Hs", name: "Hassium", year: 1984, family: "transition" },
  {
    z: 109,
    symbol: "Mt",
    name: "Meitnerium",
    year: 1982,
    family: "transition",
  },
  {
    z: 110,
    symbol: "Ds",
    name: "Darmstadtium",
    year: 1994,
    family: "transition",
  },
  {
    z: 111,
    symbol: "Rg",
    name: "Roentgenium",
    year: 1994,
    family: "transition",
  },
  {
    z: 112,
    symbol: "Cn",
    name: "Copernicium",
    year: 1996,
    family: "transition",
  },
  {
    z: 113,
    symbol: "Nh",
    name: "Nihonium",
    year: 2004,
    family: "post-transition",
  },
  {
    z: 114,
    symbol: "Fl",
    name: "Flerovium",
    year: 1999,
    family: "post-transition",
  },
  {
    z: 115,
    symbol: "Mc",
    name: "Moscovium",
    year: 2003,
    family: "post-transition",
  },
  {
    z: 116,
    symbol: "Lv",
    name: "Livermorium",
    year: 2000,
    family: "post-transition",
  },
  { z: 117, symbol: "Ts", name: "Tennessine", year: 2010, family: "halogen" },
  { z: 118, symbol: "Og", name: "Oganesson", year: 2002, family: "noble" },
];

/** Number of columns in the standard 18-column layout. */
export const TABLE_COLUMNS = 18;

export type TableCell = { readonly row: number; readonly col: number };

/**
 * Position of an element in the standard 18-column table, 0-indexed.
 * Lanthanides sit in row 7 and actinides in row 8 (drawn below a gap).
 */
export function tablePosition(z: number): TableCell {
  if (z === 1) return { row: 0, col: 0 };
  if (z === 2) return { row: 0, col: 17 };
  if (z <= 4) return { row: 1, col: z - 3 };
  if (z <= 10) return { row: 1, col: z - 3 + 10 };
  if (z <= 12) return { row: 2, col: z - 11 };
  if (z <= 18) return { row: 2, col: z - 1 };
  if (z <= 36) return { row: 3, col: z - 19 };
  if (z <= 54) return { row: 4, col: z - 37 };
  if (z <= 56) return { row: 5, col: z - 55 };
  if (z <= 71) return { row: 7, col: z - 55 };
  if (z <= 86) return { row: 5, col: z - 69 };
  if (z <= 88) return { row: 6, col: z - 87 };
  if (z <= 103) return { row: 8, col: z - 87 };
  return { row: 6, col: z - 101 };
}

/** Elements whose discovery year is at or before `year`. */
export function knownBy(year: number): Element[] {
  return ELEMENTS.filter((e) => e.year <= year);
}

/** How many elements the table held in `year`. */
export function knownCount(year: number): number {
  return ELEMENTS.reduce((n, e) => (e.year <= year ? n + 1 : n), 0);
}

/**
 * Elements that had just joined the table when the mystery year arrived:
 * anything first isolated in the `span` years up to and including it.
 */
export function recentDiscoveries(year: number, span = 6): Element[] {
  return ELEMENTS.filter((e) => e.year <= year && e.year > year - span).sort(
    (a, b) => a.year - b.year || a.z - b.z,
  );
}

/** Human-readable discovery year for the reveal cards. */
export function discoveryLabel(element: Element): string {
  return element.year === ANCIENT ? "antiquity" : String(element.year);
}
