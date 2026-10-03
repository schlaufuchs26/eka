import {
  ELEMENTS,
  type ElementFamily,
  TABLE_COLUMNS,
  tablePosition,
} from "./elements";

const CELL = 36;
const WIDTH = 33;
const HEIGHT = 33;
const F_BLOCK_GAP = 16;
const PADDING = 2;

const FAMILY_COLORS: Record<ElementFamily, string> = {
  alkali: "#ef8a5a",
  alkaline: "#e8b45f",
  transition: "#8fa8c0",
  "post-transition": "#9aa9a9",
  metalloid: "#63c1a5",
  nonmetal: "#9bd06a",
  halogen: "#4fb8d8",
  noble: "#b48fe0",
  lanthanide: "#d98fb0",
  actinide: "#c97f9f",
};

const FAMILY_LABELS: Record<ElementFamily, string> = {
  alkali: "alkali metal",
  alkaline: "alkaline earth",
  transition: "transition metal",
  "post-transition": "post-transition metal",
  metalloid: "metalloid",
  nonmetal: "nonmetal",
  halogen: "halogen",
  noble: "noble gas",
  lanthanide: "lanthanide",
  actinide: "actinide",
};

/** Y coordinate of a visual row, with the f-block pushed below a gap. */
function rowY(row: number): number {
  if (row >= 7) return PADDING + row * CELL + F_BLOCK_GAP;
  return PADDING + row * CELL;
}

const TABLE_WIDTH = TABLE_COLUMNS * CELL + PADDING * 2;
const TABLE_HEIGHT = rowY(8) + HEIGHT + PADDING;

/**
 * The periodic table as it stood in `year`: elements discovered later are drawn
 * as empty cells. Every element is always drawn in today's 18-column layout.
 */
export function PeriodicTable({ year }: { year: number }) {
  return (
    <svg
      className="table"
      viewBox={`0 0 ${TABLE_WIDTH} ${TABLE_HEIGHT}`}
      role="img"
      aria-label={`Periodic table as it stood in the mystery year: ${
        ELEMENTS.filter((element) => element.year <= year).length
      } of 118 elements`}
      data-testid="periodic-table"
    >
      {ELEMENTS.map((element) => {
        const { row, col } = tablePosition(element.z);
        const known = element.year <= year;
        const x = PADDING + col * CELL;
        const y = rowY(row);
        return (
          <g
            key={element.z}
            data-testid="element"
            data-z={element.z}
            data-known={known ? "yes" : "no"}
          >
            <title>
              {known
                ? `${element.z} ${element.name}, discovered ${element.year}`
                : `${element.z} ${element.name}, not yet known`}
            </title>
            <rect
              x={x}
              y={y}
              width={WIDTH}
              height={HEIGHT}
              rx={3}
              fill={known ? FAMILY_COLORS[element.family] : "#171717"}
              stroke={known ? "none" : "#2a2a2a"}
              strokeWidth={1}
            />
            {known ? (
              <text
                x={x + WIDTH / 2}
                y={y + HEIGHT / 2 + 5}
                textAnchor="middle"
                fontSize={13}
                fontWeight={700}
                fill="#12130f"
              >
                {element.symbol}
              </text>
            ) : (
              <text
                x={x + WIDTH / 2}
                y={y + HEIGHT / 2 + 5}
                textAnchor="middle"
                fontSize={12}
                fill="#3a3a3a"
              >
                {element.symbol}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** Colour key for the element families. */
export function FamilyLegend() {
  const families = Object.keys(FAMILY_LABELS) as ElementFamily[];
  return (
    <ul className="legend" aria-label="Element families">
      {families.map((family) => (
        <li key={family}>
          <span
            className="swatch"
            style={{ background: FAMILY_COLORS[family] }}
            aria-hidden="true"
          />
          {FAMILY_LABELS[family]}
        </li>
      ))}
    </ul>
  );
}
