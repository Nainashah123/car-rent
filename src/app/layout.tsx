import type { Metadata } from "next";
import { Fraunces, Geist, Inter } from "next/font/google";
import { TapFocus } from "@/components/app/TapFocus";
import { Toaster } from "@/components/app/Toaster";
import "./globals.css";

/* Inter Display in Figma = Inter at its display optical size (opsz axis). */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
});

/* "New Kansas" is a commercial face; Fraunces (soft) is the closest Google match. */
const kansas = Fraunces({
  variable: "--font-kansas",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "CARENT — Rent a car", template: "%s · CARENT" },
  description:
    "Classic and modern cars for rent, well-maintained and ready to go whenever you need them.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${kansas.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <TapFocus />
        <Toaster />
      </body>
    </html>
  );
}
