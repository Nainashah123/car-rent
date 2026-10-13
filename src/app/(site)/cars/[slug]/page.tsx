import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarDetailView } from "@/components/detail/CarDetailView";
import { detailFor } from "@/data/carDetails";
import { CARS, carBySlug } from "@/data/cars";

export function generateStaticParams() {
  return CARS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cars/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const car = carBySlug(slug);
  if (!car) return { title: "Car not found" };
  const detail = detailFor(car);
  return { title: detail.title ?? car.name, description: detail.description.slice(0, 155) };
}

/**
 * Figma Detail/Description — desktop 232:22751, mobile 232:22813.
 * params are awaited outside <Suspense> (generateStaticParams route) so an
 * unknown slug gets a real 404 status instead of a streamed 200.
 */
export default async function CarDetailPage({ params }: PageProps<"/cars/[slug]">) {
  const { slug } = await params;
  const car = carBySlug(slug);
  if (!car) notFound();
  return <CarDetailView car={car} detail={detailFor(car)} />;
}
