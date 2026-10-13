import { Suspense } from "react";
import { FeaturedPostCard } from "@/components/blog/BlogCards";
import { BlogList, BlogListFromParams } from "@/components/blog/BlogList";
import { FEATURED_POST } from "@/data/blog";

export const metadata = { title: "Blog" };

/** Figma "Blog" 233:49208 (desktop) / 233:50031 (mobile). */
export default function BlogPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-5 px-4 py-5 lg:gap-25 lg:px-15 lg:py-15">
      <h1 className="sr-only">CARENT blog</h1>
      <FeaturedPostCard post={FEATURED_POST} />
      <Suspense fallback={<BlogList page={1} />}>
        <BlogListFromParams />
      </Suspense>
    </div>
  );
}
