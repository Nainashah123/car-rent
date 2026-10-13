import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "black" | "white" | "ghost";
/** md = Figma "Responsive=No" (46px), sm = "Responsive=Yes" (40px), auto = sm below lg, md from lg. */
export type ButtonSize = "md" | "sm" | "auto";

const base =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-pill font-medium transition-[filter,background-color,opacity] disabled:cursor-not-allowed disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  primary: "btn-primary hover:brightness-105 active:brightness-95",
  black: "btn-black hover:brightness-125 active:brightness-90",
  white: "border border-stroke bg-white text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100",
  ghost: "text-neutral-900 underline-offset-4 hover:underline",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-[46px] gap-2 px-4 text-[16px] leading-[1.4]",
  sm: "h-10 gap-1.5 px-3.5 text-[14px] leading-[1.2]",
  auto: "h-10 gap-1.5 px-3.5 text-[14px] leading-[1.2] lg:h-[46px] lg:gap-2 lg:px-4 lg:text-[16px] lg:leading-[1.4]",
};

type Common = { variant?: ButtonVariant; size?: ButtonSize; className?: string; children: ReactNode };

export function buttonClass({ variant = "primary", size = "auto", className }: Omit<Common, "children">) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...rest
}: Common & ComponentProps<"button">) {
  return <button type={type} className={buttonClass({ variant, size, className })} {...rest} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...rest
}: Common & ComponentProps<typeof Link>) {
  return <Link className={buttonClass({ variant, size, className })} {...rest} />;
}
