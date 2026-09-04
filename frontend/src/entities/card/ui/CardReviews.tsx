"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { formatRelativeTime } from "../model/formatRelativeTime";
import { useTranslation } from "@/shared/i18n";
import type { RatingSummary, Review } from "@/shared/types/card";

const VISIBLE_BY_DEFAULT = 2;

interface CardReviewsProps {
  summary: RatingSummary;
  reviews: Review[];
}

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 flex-shrink-0">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`w-3.5 h-3.5 ${
            index < rating ? "fill-dark text-dark" : "fill-dark/15 text-dark/15"
          }`}
        />
      ))}
    </div>
  );
}

export function CardReviews({ summary, reviews }: CardReviewsProps) {
  const { t, locale } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  const maxCount = Math.max(...summary.breakdown, 1);
  const visibleReviews = showAll
    ? reviews
    : reviews.slice(0, VISIBLE_BY_DEFAULT);
  const hasMore = reviews.length > VISIBLE_BY_DEFAULT;

  return (
    <section className="mb-8">
      <div className="flex items-baseline justify-between mb-4 px-1">
        <h3 className="text-xs font-bold text-dark/50 uppercase tracking-wider">
          {t("card.reviewsTitle")}
        </h3>
        <p className="text-sm text-dark/50">
          <span className="text-base font-extrabold text-dark">
            {summary.average.toFixed(1)}
          </span>{" "}
          ({summary.total.toLocaleString(locale)})
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {visibleReviews.map((review) => (
          <article key={review.id} className="bg-dark/[0.03] rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src={review.avatar}
                alt={review.author}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-dark leading-tight truncate">
                  {review.author}
                </p>
                <p className="text-xs text-dark/50">
                  {formatRelativeTime(review.createdAt, locale)}
                </p>
              </div>
              <ReviewStars rating={review.rating} />
            </div>
            <p className="text-sm text-dark/80 leading-relaxed">
              {review.text}
            </p>
          </article>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setShowAll((v) => !v)}
          className="mt-4 text-brand-purple font-bold text-sm"
        >
          {showAll ? t("card.showFewerReviews") : t("card.seeAllReviews")}
        </button>
      )}
    </section>
  );
}
