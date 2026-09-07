"use client";

import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { formatRelativeTime } from "../model/formatRelativeTime";
import { ROUTES } from "@/shared/config/routes";
import { useTranslation } from "@/shared/i18n";
import type { MyReview, RatingSummary, Review } from "@/shared/types/card";

const VISIBLE_BY_DEFAULT = 2;

interface CardReviewsProps {
  summary: RatingSummary;
  reviews: Review[];
  /** The signed-in visitor's own review, if any — switches the CTA to "edit". */
  myReview?: MyReview | null;
  /** Open the review sheet. Omitted for guests, which hides the CTA. */
  onWriteReview?: () => void;
}

/** Author's initial on a purple tile — same treatment as the profile pages. */
function ReviewAvatar({ name }: { name: string }) {
  return (
    <div className="w-10 h-10 rounded-full bg-brand-purple flex items-center justify-center flex-shrink-0">
      <span className="text-sm font-bold text-white">
        {name[0]?.toUpperCase() ?? "?"}
      </span>
    </div>
  );
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

export function CardReviews({
  summary,
  reviews,
  myReview,
  onWriteReview,
}: CardReviewsProps) {
  const { t, locale } = useTranslation();
  const [showAll, setShowAll] = useState(false);

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

      {onWriteReview && (
        <button
          onClick={onWriteReview}
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dark/10 py-3 text-sm font-bold text-dark transition-colors hover:border-dark/30"
        >
          <Star className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
          {myReview ? t("card.editYourReview") : t("card.writeReview")}
        </button>
      )}

      <div className="flex flex-col gap-3">
        {visibleReviews.map((review) => (
          <Link
            key={review.id}
            href={
              review.id === myReview?.id
                ? ROUTES.profile
                : ROUTES.publicProfile(review.authorUsername)
            }
            className="block bg-dark/[0.03] rounded-2xl p-4 transition-colors hover:bg-dark/[0.06]"
          >
            <div className="flex items-center gap-3 mb-2">
              <ReviewAvatar name={review.author} />
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
          </Link>
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
