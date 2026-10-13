"use client";

import Image from "next/image";
import { IconLink } from "@tabler/icons-react";
import { toast } from "@/components/app/Toaster";

type Network = { key: string; label: string; icon: string; w: string; build: (url: string, title: string) => string };

const NETWORKS: Network[] = [
  {
    key: "x",
    label: "Share on X",
    icon: "/images/blog/share-x.svg",
    w: "size-[13.714px] lg:size-5",
    build: (u, t) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
  },
  {
    key: "facebook",
    label: "Share on Facebook",
    icon: "/images/blog/share-facebook.svg",
    w: "size-[13.714px] lg:size-5",
    build: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
  },
  {
    key: "linkedin",
    label: "Share on LinkedIn",
    icon: "/images/blog/share-linkedin.svg",
    w: "h-[14.4px] w-[13.105px] lg:h-[21px] lg:w-[19.111px]",
    build: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`,
  },
];

/** Round glassy pill drawn inside the button so the button can grow to 44px on touch. */
const pill =
  "flex items-center overflow-hidden rounded-pill bg-linear-136 from-white to-share-end px-[5.486px] py-[4.8px] transition-[filter] group-hover:brightness-95 lg:px-2 lg:py-[7px]";

/** "Share:" row under the article (Figma 232:27361). */
export function ShareBar({ title }: { title: string }) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast("Link copied to clipboard");
    } catch {
      toast("Couldn't copy the link. Copy it from the address bar.", "error");
    }
  }

  return (
    <div className="flex items-center gap-3.5">
      <p className="text-[12px] leading-[1.4] whitespace-nowrap text-neutral-400 lg:text-[14px]">Share:</p>
      <ul className="flex items-start gap-3.5">
        {NETWORKS.map((n) => (
          <li key={n.key} className="flex">
            <button
              type="button"
              aria-label={n.label}
              onClick={() => window.open(n.build(window.location.href, title), "_blank", "noopener,noreferrer")}
              className="group flex items-center justify-center"
            >
              <span className={pill}>
                <Image src={n.icon} alt="" width={20} height={20} unoptimized className={n.w} />
              </span>
            </button>
          </li>
        ))}
        <li className="flex">
          <button type="button" aria-label="Copy link" onClick={copy} className="group flex items-center justify-center">
            <span className={pill}>
              <IconLink className="size-[13.714px] text-black lg:size-5" stroke={1.75} aria-hidden />
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
}
