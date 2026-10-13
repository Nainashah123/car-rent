import { ButtonLink } from "@/components/ui/Button";

export default function BlogPostNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-4 px-4 py-20 text-center lg:gap-6 lg:px-15 lg:py-30">
      <h1 className="font-display text-[24px] leading-[1.2] font-medium text-ink lg:text-[40px]">Article not found</h1>
      <p className="max-w-[480px] text-[14px] leading-[1.4] text-neutral-400 lg:text-[16px]">
        This article may have been moved or removed. Browse the latest road-trip ideas, driving tips and CARENT news instead.
      </p>
      <ButtonLink href="/blog" variant="black">
        Back to blog
      </ButtonLink>
    </div>
  );
}
