import Image from "next/image";
import Link from "next/link";
import { FOOTER_COLUMNS } from "@/data/nav";

/**
 * Figma Footer (64:11307 desktop 1440×588, 64:11306 mobile 375×619).
 * The giant "CARENT" wordmark is a photo masked by the logo shape.
 */
export function Footer() {
  return (
    <footer className="relative mx-auto flex h-[619px] w-full max-w-[1440px] flex-col items-center overflow-hidden bg-white px-4 pt-8 lg:h-[588px] lg:px-[60px] lg:pt-[60px]">
      <div className="flex w-full max-w-[1320px] flex-col items-start gap-14 lg:flex-row lg:justify-between lg:gap-0">
        <div className="flex w-full flex-col items-start lg:w-[392px]">
          <Link href="/" aria-label="CARENT home" className="relative block h-[40.47px] w-[86px] lg:h-[72.94px] lg:w-[155px]">
            <Image src="/icons/logo-footer.svg" alt="CARENT" fill unoptimized />
          </Link>
          <p className="text-[14px] leading-[1.2] lg:text-[16px] lg:leading-[1.4]">
            Classic and modern cars for rent, well-maintained and ready to go whenever you need them.
          </p>
        </div>
        <div className="flex w-full flex-wrap items-start gap-10 lg:w-auto lg:flex-nowrap">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="flex w-24 flex-col items-start gap-4">
              <p className="w-full text-[14px] leading-[1.4] font-semibold lg:text-[16px]">{col.title}</p>
              <ul className="flex w-full flex-col gap-2.5 text-[14px] leading-[1.2] lg:text-[16px] lg:leading-[1.4]">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-primary-600">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Mask box = Figma mask (mobile 375×76 @ y560, desktop 1299×264 @ x81 y383); photo keeps its Figma offset inside it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[560px] left-0 h-[76.23px] w-full overflow-hidden [mask-image:url(/icons/footer-mask-mobile.svg)] [mask-size:100%_100%] [mask-repeat:no-repeat] lg:top-[383px] lg:left-[81px] lg:h-[264px] lg:w-[1298.75px] lg:[mask-image:url(/icons/footer-mask.svg)]"
      >
        <div className="absolute top-[-48.22px] left-0 h-[250.34px] w-[375.46px] lg:top-[-282px] lg:h-[867px] lg:w-[1300.34px]">
          <Image src="/images/footer-photo.jpg" alt="" fill sizes="(min-width:1024px) 1300px, 376px" className="object-cover" />
        </div>
      </div>
    </footer>
  );
}
