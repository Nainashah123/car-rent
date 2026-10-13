import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { PostCard } from "@/components/blog/BlogCards";
import { ShareBar } from "@/components/blog/ShareBar";
import { ButtonLink } from "@/components/ui/Button";
import { ALL_POSTS, postBySlug, relatedPosts, sectionId, type BlogPost } from "@/data/blog";

export function generateStaticParams() {
  return ALL_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  return post ? { title: post.title, description: post.excerpt } : { title: "Article not found" };
}

/**
 * Figma "Detail blog" 232:27331 (desktop) / 233:49767 (mobile).
 * params are awaited outside <Suspense> (generateStaticParams route) so an
 * unknown slug gets a real 404 status instead of a streamed 200.
 */
export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();
  return <Article post={post} />;
}

function Article({ post }: { post: BlogPost }) {
  const toc = post.sections.map((s) => ({ id: sectionId(s.title), title: s.title }));
  const related = relatedPosts(post);

  return (
    <>
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 px-4 py-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,861px)_minmax(263px,1fr)] lg:px-0 lg:py-20">
        <article data-blog="article" className="flex w-full min-w-0 flex-col items-center gap-5 lg:col-start-2 lg:gap-8 lg:px-20">
          <h1 className="w-full font-display text-[24px] leading-[1.2] font-medium text-ink lg:text-[40px]">{post.title}</h1>

          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image src={post.author.avatar} alt="" width={32} height={32} className="size-6 shrink-0 rounded-full object-cover lg:size-8" />
              <p className="text-[14px] leading-[1.2] whitespace-nowrap text-neutral-900 lg:text-[16px] lg:leading-[1.4]">{post.author.name}</p>
            </div>
            <p className="text-[14px] leading-[1.2] whitespace-nowrap text-ink lg:text-[16px] lg:leading-[1.4]">{post.readTime} min read</p>
          </div>

          <div className="relative h-[187px] w-full shrink-0 overflow-hidden rounded-[20px] md:h-[320px] lg:h-[379px]">
            <Image src={post.cover} alt="" fill priority sizes="(min-width:1024px) 701px, 100vw" className="object-cover" />
          </div>

          <div className="flex w-full flex-col gap-[1.2em] text-[14px] leading-[1.2] text-neutral-900 lg:gap-[22px] lg:font-geist lg:text-[16px] lg:leading-[22px] lg:tracking-[-0.16px]">
            {post.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {post.sections.map((s) => (
            <section key={s.title} id={sectionId(s.title)} className="flex w-full scroll-mt-6 flex-col items-start gap-1.5 text-neutral-900 lg:gap-2.5">
              <h2 className="w-full text-[16px] leading-[1.3] font-medium lg:text-[24px] lg:leading-[1.2]">{s.title}</h2>
              <p className="w-full text-[14px] leading-[1.2] lg:font-geist lg:text-[16px] lg:leading-[22px] lg:tracking-[-0.16px]">{s.body}</p>
            </section>
          ))}

          <ShareBar title={post.title} />
        </article>

        <aside className="hidden lg:col-start-3 lg:row-start-1 lg:block">
          <div className="sticky top-6">
            <ArticleToc items={toc} />
          </div>
        </aside>
      </div>

      <section aria-labelledby="related-title" className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 pt-5 pb-10 lg:gap-10 lg:px-15 lg:pt-0 lg:pb-20">
        <div className="flex w-full items-center justify-between gap-4">
          <h2 id="related-title" className="font-display text-[24px] leading-[1.2] font-medium text-neutral-900 lg:text-[40px]">
            More from the blog
          </h2>
          <ButtonLink href="/blog" variant="white">
            <IconArrowLeft className="size-4 lg:size-5" stroke={1.5} aria-hidden />
            All articles
          </ButtonLink>
        </div>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3 lg:gap-10">
          {related.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </>
  );
}
