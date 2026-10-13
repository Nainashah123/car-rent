import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { formatPostDate, type BlogCategory, type BlogPost } from "@/data/blog";
import { cn } from "@/lib/cn";

export const postHref = (p: BlogPost) => `/blog/${p.slug}`;
export const categoryHref = (c: BlogCategory) => `/blog?category=${encodeURIComponent(c)}`;

/** Category label tag that filters the blog list. */
function CategoryTag({ category, size }: { category: BlogCategory; size: "md" | "auto" }) {
  return (
    <Link href={categoryHref(category)} aria-label={`More ${category} articles`} className="relative z-10 inline-block leading-none hover:opacity-80">
      <Tag tone="grey" size={size}>
        {category}
      </Tag>
    </Link>
  );
}

/** Avatar · name · dot · date row. */
export function PostByline({ post, variant }: { post: BlogPost; variant: "featured" | "default" }) {
  const featured = variant === "featured";
  const text = featured
    ? "text-[14px] leading-[1.2] font-medium text-neutral-900 lg:text-[16px] lg:leading-[1.4]"
    : "text-[14px] leading-[1.2] text-neutral-500 lg:text-[16px] lg:leading-[1.4]";
  return (
    <div className="flex w-full items-center gap-3">
      <div className="flex items-center gap-3">
        <Image
          src={post.author.avatar}
          alt=""
          width={40}
          height={40}
          className={cn("shrink-0 rounded-full object-cover", featured ? "size-7 lg:size-10" : "size-7")}
        />
        <p className={cn("whitespace-nowrap", text)}>{post.author.name}</p>
      </div>
      <span aria-hidden className="size-[3px] shrink-0 rounded-full bg-neutral-400" />
      <time dateTime={post.date} className={cn("whitespace-nowrap", text)}>
        {formatPostDate(post.date)}
      </time>
    </div>
  );
}

/** Figma "Card Blog / Featured" (141:13219). */
export function FeaturedPostCard({ post }: { post: BlogPost }) {
  const href = postHref(post);
  return (
    <article data-blog="featured" className="flex w-full flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-8">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="relative block h-[180px] w-full shrink-0 overflow-hidden rounded-[20px] md:h-[300px] lg:h-[379px] lg:w-auto lg:min-w-0 lg:flex-1"
      >
        <Image src={post.cover} alt="" fill priority sizes="(min-width:1024px) 644px, 100vw" className="object-cover" />
      </Link>
      <div className="flex w-full min-w-0 flex-col items-start gap-2 lg:flex-1 lg:gap-3">
        <CategoryTag category={post.category} size="md" />
        <h2 className="font-display text-[18px] leading-[1.2] font-medium text-neutral-900 lg:text-[32px]">
          <Link href={href} className="inline-block w-full hover:underline">
            {post.title}
          </Link>
        </h2>
        <p className="line-clamp-3 text-[14px] leading-[1.2] text-neutral-400 lg:line-clamp-2 lg:h-[62px] lg:text-[20px] lg:leading-[1.4] lg:tracking-[-0.2px]">
          {post.excerpt}
        </p>
        <PostByline post={post} variant="featured" />
      </div>
    </article>
  );
}

/** Figma "Card Blog / Default" (141:13219). */
export function PostCard({ post, headingLevel = "h3" }: { post: BlogPost; headingLevel?: "h2" | "h3" }) {
  const href = postHref(post);
  const H = headingLevel;
  return (
    <article data-blog="card" className="flex w-full min-w-0 flex-col items-start gap-4">
      <Link href={href} tabIndex={-1} aria-hidden className="relative block h-[180px] w-full overflow-hidden rounded-2xl md:h-[220px] lg:h-[249px]">
        <Image src={post.cover} alt="" fill sizes="(min-width:1024px) 414px, (min-width:768px) 50vw, 100vw" className="object-cover" />
      </Link>
      <div className="flex w-full flex-col items-start gap-3">
        <CategoryTag category={post.category} size="auto" />
        <H className="text-[16px] leading-[1.3] font-medium text-neutral-900 lg:text-[20px] lg:leading-[1.4] lg:tracking-[-0.2px]">
          <Link href={href} className="inline-block w-full hover:underline">
            {post.title}
          </Link>
        </H>
        <PostByline post={post} variant="default" />
      </div>
    </article>
  );
}
