import { cn } from "@/lib/cn";

/** [classes, size in Figma px]. Sizes become flex-grow weights so the band scales with its width. */
type Cell = [string, number];
type Column = { w: number; cells?: Cell[]; split?: [Cell[], Cell[]]; head?: Cell };

const COLUMNS: Column[] = [
  { w: 97.627, cells: [["bg-linear-to-b from-primary-50 to-primary-300", 161.695], ["bg-linear-to-b from-primary-500 to-primary-400", 95.593], ["bg-linear-to-l from-primary-600 to-primary-400", 50.847]] },
  { w: 97.627, cells: [["bg-linear-to-r from-primary-400 to-primary-200", 161.695], ["bg-linear-to-b from-primary-300 to-primary-500", 95.593], ["bg-linear-to-r from-primary-500 to-primary-300", 50.847]] },
  { w: 202.373, cells: [["bg-linear-to-b from-primary-600 to-primary-300", 139.322], ["bg-linear-to-r from-primary-500 to-primary-300 opacity-80 -scale-y-100", 22.373], ["bg-linear-to-r from-primary-300 to-primary-600", 95.593], ["bg-linear-to-r from-primary-200 to-primary-500", 50.847]] },
  { w: 97.627, cells: [["bg-linear-to-r from-primary-500 to-primary-200", 24.407], ["bg-linear-to-b from-primary-600 to-primary-300 opacity-40", 114.915], ["bg-linear-to-r from-primary-500 to-primary-200", 117.966], ["bg-linear-to-b from-primary-300 to-primary-500", 50.847]] },
  { w: 97.627, cells: [["bg-linear-to-b from-primary-200 to-primary-500", 161.695], ["bg-linear-to-r from-primary-500 to-primary-300", 30.508], ["bg-linear-to-b from-primary-600 to-primary-300", 95.593], ["bg-linear-to-r from-primary-200 to-primary-500", 20.339]] },
  { w: 98.644, cells: [["bg-linear-to-r from-primary-500 to-primary-300", 24.407], ["bg-linear-to-b from-primary-300 to-primary-600", 117.966], ["bg-linear-to-r from-primary-200 to-primary-500", 114.915], ["bg-linear-to-b from-primary-300 to-primary-500", 50.847]] },
  {
    w: 482.034,
    head: ["bg-linear-to-r from-primary-500 to-primary-200", 140.339],
    split: [
      [["bg-linear-to-b from-primary-600 to-primary-300", 1], ["bg-linear-to-r from-primary-200 to-primary-500", 1], ["bg-linear-to-b from-primary-600 to-primary-300", 1]],
      [["bg-linear-to-r from-primary-500 to-primary-200", 1], ["bg-linear-to-r from-primary-500 to-primary-300", 1], ["bg-linear-to-r from-primary-200 to-primary-500", 1], ["bg-linear-to-b from-primary-300 to-primary-500", 1]],
    ],
  },
  { w: 98.644, cells: [["bg-linear-to-r from-primary-500 to-primary-200", 24.407], ["bg-linear-to-b from-primary-200 to-primary-500", 114.915], ["bg-linear-to-r from-primary-300 to-primary-600", 117.966], ["bg-linear-to-r from-primary-400 to-primary-200", 50.847]] },
  { w: 97.627, cells: [["bg-white opacity-78", 24.407], ["bg-linear-to-b from-primary-200 to-primary-500", 53.898], ["bg-white", 64.068], ["bg-linear-to-b from-primary-300 to-primary-500", 50.847], ["bg-linear-to-r from-primary-500 to-primary-200", 114.915]] },
  { w: 70.169, cells: [["bg-linear-to-b from-primary-200 to-primary-500", 24.407], ["bg-white", 53.898], ["bg-linear-to-b from-primary-200 to-primary-500", 64.068], ["bg-linear-to-b from-primary-600 to-primary-300", 50.847], ["bg-linear-to-b from-primary-200 to-primary-500", 114.915]] },
];

function Cells({ cells }: { cells: Cell[] }) {
  return cells.map(([cls, size], i) => <div key={i} className={cn("min-h-0 basis-0", cls)} style={{ flexGrow: size }} />);
}

/**
 * Decorative pink gradient mosaic at the top of Contact us (233:46029 / 233:48235).
 * 1440 x 308 in Figma; scales with the page width (375 → 80px on mobile).
 */
export function PatternBand({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none flex aspect-[1440/308.136] w-full", className)}>
      {COLUMNS.map((col, i) => (
        <div key={i} className="flex min-w-0 basis-0 flex-col" style={{ flexGrow: col.w }}>
          {col.cells && <Cells cells={col.cells} />}
          {col.head && <div className={cn("min-h-0 basis-0", col.head[0])} style={{ flexGrow: col.head[1] }} />}
          {col.split && (
            <div className="flex min-h-0 basis-0" style={{ flexGrow: 167.797 }}>
              {col.split.map((cells, j) => (
                <div key={j} className="flex flex-1 flex-col">
                  <Cells cells={cells} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
