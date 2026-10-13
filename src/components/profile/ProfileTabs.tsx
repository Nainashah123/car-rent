"use client";

import Image from "next/image";
import { PROFILE_TABS, type ProfileTabId } from "@/data/profile";
import { cn } from "@/lib/cn";

/** Figma "Tab profile" (89:31532): desktop 400×60, mobile 343×52. */
export function ProfileTabs({ active, onSelect, className }: { active: ProfileTabId; onSelect: (id: ProfileTabId) => void; className?: string }) {
  return (
    <div role="tablist" aria-label="Profile sections" aria-orientation="vertical" className={cn("flex w-full flex-col gap-1 lg:w-[400px] lg:gap-2", className)}>
      {PROFILE_TABS.map((t) => {
        const on = t.id === active;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={on}
            aria-controls="profile-panel"
            onClick={() => onSelect(t.id)}
            className={cn(
              "flex h-[52px] w-full items-center gap-3 rounded-[16px] px-3 py-2.5 text-left transition-colors lg:h-[60px]",
              on ? "bg-neutral-50" : "hover:bg-neutral-50/60",
            )}
          >
            <Image src={t.icon} alt="" width={40} height={40} className="size-8 shrink-0 object-cover lg:size-10" />
            <span className="text-[18px] leading-[1.3] font-medium whitespace-nowrap text-neutral-900 lg:text-[24px] lg:leading-[1.2]">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
