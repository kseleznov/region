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
        {/* -mr offsets RankBadge's larger (w-16) box so its visual gap to the
            bell matches the bell↔city gap under the uniform gap-4 */}
        <div className="-mr-2.5">
          <RankBadge userProgress={userProgress} />
        </div>
        {isAuthenticated && (
          <button
            type="button"
            onClick={openNotifications}
            aria-label={t("notifications.title")}
            className="relative flex h-11 w-11 items-center justify-center text-white transition-transform active:scale-95"
          >
            <Bell size={24} strokeWidth={1.75} />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-2 h-2.5 w-2.5 rounded-full bg-brand-pink ring-2 ring-brand-purple" />
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
