import Image from "next/image";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="CARENT home" className={className}>
      <Image src="/icons/logo.svg" alt="CARENT" width={85} height={40} priority unoptimized />
    </Link>
  );
}
