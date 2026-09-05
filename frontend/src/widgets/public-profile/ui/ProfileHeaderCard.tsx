"use client";

import { MapPin, Plus, Check, Share2 } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { useTranslation } from "@/shared/i18n";
import type { PublicProfileData } from "../model/types";

interface ProfileHeaderCardProps {
  profile: PublicProfileData;
  citiesCount: number;
  totalPlacesVisited: number;
  onToggleFollow: () => void;
}

export function ProfileHeaderCard({
  profile,
  citiesCount,
  totalPlacesVisited,
  onToggleFollow,
}: ProfileHeaderCardProps) {
  const { t } = useTranslation();

  return (
    <div className="relative bg-brand-purple rounded-3xl p-5 flex flex-col gap-4">
      <button
        aria-label={t("card.aria.share")}
        className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
      >
        <Share2 size={16} className="text-light" />
      </button>

      <div className="flex items-center gap-4 pr-12">
        <div className="w-16 h-16 rounded-2xl bg-brand-yellow flex items-center justify-center flex-shrink-0">
          <span className="text-2xl font-bold text-dark">
            {profile.name[0]?.toUpperCase() ?? "?"}
          </span>
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-light truncate">
            {profile.name}
          </h1>
          <p className="text-sm text-light/70 truncate">@{profile.username}</p>
        </div>
      </div>

      <p className="text-sm text-light/90 leading-relaxed">{profile.bio}</p>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-light/50 truncate">
            {t("publicProfile.followers")}
          </p>
          <p className="text-lg font-bold text-light">
            {profile.followersCount.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-light/50 truncate">
            {t("publicProfile.cities")}
          </p>
          <p className="text-lg font-bold text-light">{citiesCount}</p>
        </div>
      </div>

      <button
        onClick={onToggleFollow}
        aria-label={t(
          profile.isFollowing
            ? "publicProfile.aria.unfollow"
            : "publicProfile.aria.follow",
          { name: profile.name },
        )}
        className={cn(
          "w-full rounded-full py-3.5 flex items-center justify-center gap-2 text-sm font-bold transition-colors",
          profile.isFollowing
            ? "bg-white/15 text-light"
            : "bg-brand-yellow text-dark",
        )}
      >
        {profile.isFollowing ? <Check size={16} /> : <Plus size={16} />}
        {t(
          profile.isFollowing
            ? "publicProfile.followingAction"
            : "publicProfile.follow",
        )}
      </button>
    </div>
  );
}
