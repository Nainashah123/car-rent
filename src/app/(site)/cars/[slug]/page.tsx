import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CarDetailView, CarDetailSkeleton } from "@/components/detail/CarDetailView";
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

async function CarDetail({ params }: Pick<PageProps<"/cars/[slug]">, "params">) {
  const { slug } = await params;
  const car = carBySlug(slug);
  if (!car) notFound();
  return <CarDetailView car={car} detail={detailFor(car)} />;
}

/** Figma Detail/Description — desktop 232:22751, mobile 232:22813. */
export default function CarDetailPage({ params }: PageProps<"/cars/[slug]">) {
  return (
    <Suspense fallback={<CarDetailSkeleton />}>
      <CarDetail params={params} />
    </Suspense>
  );
}
