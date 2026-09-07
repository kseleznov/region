"use client";

import Image from "next/image";
import { Bell, MapPin } from "lucide-react";
import { Button } from "@/shared/ui";
import { RankBadge } from "@/entities/rank";
import { useCityName } from "@/entities/city";
import { useTranslation } from "@/shared/i18n";
import { useHeader } from "../model/useHeader";

export function Header() {
  const {
    isAuthenticated,
    selectedCity,
    userProgress,
    unreadCount,
    redirect,
    openNotifications,
  } = useHeader();
  const { t } = useTranslation();
  const cityName = useCityName();

  return (
    <header className="flex justify-between px-[16px] py-[24px]">
      <Image
        src="/logo.svg"
        alt="circle text"
        width={100}
        height={40}
        priority
      />
      <div className="flex items-center gap-4">
        <RankBadge userProgress={userProgress} />
        {isAuthenticated && (
          <button
            type="button"
            onClick={openNotifications}
            aria-label={t("notifications.title")}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-dark/10 text-dark"
          >
            <Bell size={18} strokeWidth={1.75} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-pink px-1 text-[10px] font-bold text-light">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
        )}
        <Button variant="selectedCity" onClick={redirect}>
          <MapPin size={16} />
          {selectedCity ? cityName(selectedCity) : t("header.selectCity")}
        </Button>
      </div>
    </header>
  );
}
