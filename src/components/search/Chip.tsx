import Image from "next/image";
import type { ImgCrop } from "@/data/search";
import { cn } from "@/lib/cn";

/** 20×20 3D icon with its Figma crop (or cover when no crop). */
export function Icon3d({ src, crop, className }: { src: string; crop?: ImgCrop; className?: string }) {
  return (
    <span className={cn("relative block size-5 shrink-0 overflow-hidden", className)} aria-hidden>
      {crop ? (
        <span
          className="absolute block"
          style={{ left: `${crop.left}%`, top: `${crop.top}%`, width: `${crop.width}%`, height: `${crop.height}%` }}
        >
          <Image src={src} alt="" fill sizes="40px" className="object-fill" />
        </span>
      ) : (
        <Image src={src} alt="" fill sizes="40px" className="object-cover" />
      )}
    </span>
  );
}

/**
 * Figma "Label selection" (58:2107): 40px, 12px radius, 1px #d5d5d5 border;
 * active = neutral-900 border. Toggle button (aria-pressed).
 */
export function Chip({
  label,
  active,
  onToggle,
  icon,
  crop,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
  icon?: string;
  crop?: ImgCrop;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onToggle}
      className={cn(
        "flex h-10 shrink-0 items-center justify-center gap-2.5 rounded-[12px] border bg-white px-3 text-[16px] leading-[1.4] font-medium whitespace-nowrap transition-colors",
        active ? "border-neutral-900 text-neutral-900" : "border-chip-stroke text-black hover:border-neutral-300",
      )}
    >
      {icon && <Icon3d src={icon} crop={crop} />}
      {label}
    </button>
  );
}
