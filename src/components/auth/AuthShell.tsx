import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Login / Signup frame body (233:42116): 12px padding, photo panel on the
 * left (desktop only), 698px form column on the right.
 */
export function AuthShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-1 items-start justify-center gap-5 bg-white lg:h-[900px] lg:flex-none lg:p-3">
      <div className="relative hidden h-full min-w-px flex-1 overflow-hidden rounded-card lg:block">
        <Image src="/images/auth-hero.jpg" alt="" fill priority sizes="698px" className="object-cover" />
      </div>
      <div className="flex w-full flex-col items-center gap-8 px-4 py-16 lg:h-full lg:w-[698px] lg:shrink-0 lg:justify-center lg:px-10 lg:py-20">
        <h1 className="font-display text-[32px] leading-[1.2] whitespace-nowrap text-neutral-900 lg:text-[56px] lg:leading-[1.4]">
          {title}
        </h1>
        <div className="flex w-full flex-col items-center gap-5 lg:w-[378px]">{children}</div>
      </div>
    </div>
  );
}

export function AuthSwitch({ prompt, children }: { prompt: string; children: ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center gap-1">
      <p className="text-[14px] leading-[1.2] text-base-black lg:text-[16px] lg:leading-[1.4]">{prompt}</p>
      {children}
    </div>
  );
}
