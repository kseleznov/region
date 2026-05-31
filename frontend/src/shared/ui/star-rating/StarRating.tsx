import { Star } from "lucide-react";

export function StarRating({ rating }: { rating: number }) {
  const filled = Math.floor(rating);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          className={
            index < filled
              ? "fill-brand-yellow text-brand-yellow"
              : "fill-white/30 text-white/30"
          }
        />
      ))}
    </div>
  );
}
