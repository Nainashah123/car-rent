import type { CSSProperties } from "react";

/**
 * Pink gradient mosaic under the hero title (Figma 232:21766, 1416×303).
 * Purely decorative: sizes are the Figma px, rendered as % so the block
 * scales down to the 351px mobile version (232:22163) with the same shape.
 */
type Dir = "b" | "r" | "l";
type Cell = { h: number; bg: string; o?: number } | { h: number; split: Cell[][] };

const W = 1416;
const H = 303;
const dirs: Record<Dir, string> = { b: "to bottom", r: "to right", l: "to left" };
const g = (d: Dir, from: number | "white", to?: number): string =>
  from === "white" ? "var(--white)" : `linear-gradient(${dirs[d]}, var(--primary-${from}), var(--primary-${to}))`;
const W_ = "white" as const;

const COLUMNS: { w: number; cells: Cell[] }[] = [
  { w: 96, cells: [{ h: 159, bg: g("b", 50, 300) }, { h: 94, bg: g("b", 500, 400) }, { h: 50, bg: g("l", 600, 400) }] },
  { w: 96, cells: [{ h: 159, bg: g("r", 400, 200) }, { h: 94, bg: g("b", 300, 500) }, { h: 50, bg: g("r", 500, 300) }] },
  { w: 199, cells: [{ h: 137, bg: g("b", 600, 300) }, { h: 22, bg: g("r", 500, 300), o: 0.8 }, { h: 94, bg: g("r", 300, 600) }, { h: 50, bg: g("r", 200, 500) }] },
  { w: 96, cells: [{ h: 24, bg: g("r", 500, 200) }, { h: 113, bg: g("b", 600, 300), o: 0.4 }, { h: 116, bg: g("r", 500, 200) }, { h: 50, bg: g("b", 300, 500) }] },
  { w: 96, cells: [{ h: 159, bg: g("b", 200, 500) }, { h: 30, bg: g("r", 500, 300) }, { h: 94, bg: g("b", 600, 300) }, { h: 20, bg: g("r", 200, 500) }] },
  { w: 97, cells: [{ h: 24, bg: g("r", 500, 300) }, { h: 116, bg: g("b", 300, 600) }, { h: 113, bg: g("r", 200, 500) }, { h: 50, bg: g("b", 300, 500) }] },
  {
    w: 474,
    cells: [
      { h: 138, bg: g("r", 500, 200) },
      {
        h: 165,
        split: [
          [{ h: 55, bg: g("b", 600, 300) }, { h: 55, bg: g("r", 200, 500) }, { h: 55, bg: g("b", 600, 300) }],
          [{ h: 41.25, bg: g("r", 500, 200) }, { h: 41.25, bg: g("r", 500, 300) }, { h: 41.25, bg: g("r", 200, 500) }, { h: 41.25, bg: g("b", 300, 500) }],
        ],
      },
    ],
  },
  { w: 97, cells: [{ h: 24, bg: g("r", 500, 200) }, { h: 113, bg: g("b", 200, 500) }, { h: 116, bg: g("r", 300, 600) }, { h: 50, bg: g("r", 400, 200) }] },
  { w: 96, cells: [{ h: 24, bg: g("b", W_), o: 0.78 }, { h: 53, bg: g("b", 200, 500) }, { h: 63, bg: g("b", W_) }, { h: 50, bg: g("b", 300, 500) }, { h: 113, bg: g("r", 500, 200) }] },
  { w: 69, cells: [{ h: 24, bg: g("b", 200, 500) }, { h: 53, bg: g("b", W_) }, { h: 63, bg: g("b", 200, 500) }, { h: 50, bg: g("b", 600, 300) }, { h: 113, bg: g("b", 200, 500) }] },
];

function Cells({ cells, total }: { cells: Cell[]; total: number }) {
  return cells.map((c, i) => {
    const style: CSSProperties = { height: `${(c.h / total) * 100}%` };
    if ("split" in c)
      return (
        <div key={i} className="flex w-full" style={style}>
          {c.split.map((col, j) => (
            <div key={j} className="flex h-full flex-1 flex-col">
              <Cells cells={col} total={c.h} />
            </div>
          ))}
        </div>
      );
    return <div key={i} className="w-full" style={{ ...style, background: c.bg, opacity: c.o }} />;
  });
}

export function HeroMosaic({ className }: { className?: string }) {
  return (
    <div aria-hidden className={className} style={{ aspectRatio: `${W} / ${H}` }}>
      <div className="flex h-full w-full">
        {COLUMNS.map((col, i) => (
          <div key={i} className="flex h-full flex-col" style={{ width: `${(col.w / W) * 100}%` }}>
            <Cells cells={col.cells} total={H} />
          </div>
        ))}
      </div>
    </div>
  );
}
