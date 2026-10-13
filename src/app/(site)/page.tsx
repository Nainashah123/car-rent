import { CarCard } from "@/components/cars/CarCard";
import { CARS } from "@/data/cars";

export default function HomePage() {
  return (
    <div className="mx-auto grid w-full max-w-[816px] grid-cols-2 gap-6 p-4 lg:grid-cols-3">
      {CARS.slice(0, 6).map((c) => (
        <CarCard key={c.id} car={c} />
      ))}
    </div>
  );
}
