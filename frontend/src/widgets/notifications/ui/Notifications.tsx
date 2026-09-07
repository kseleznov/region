"use client";

import { useRouter } from "next/navigation";
import { Bell, ChevronLeft } from "lucide-react";
import { useTranslation } from "@/shared/i18n";
import { useNotificationsFeed } from "../model/useNotificationsFeed";
import { NotificationRow } from "./NotificationRow";

export function Notifications() {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    notifications,
    isLoading,
    isEmpty,
    unreadCount,
    isMarkingAll,
    markAllRead,
    markOneRead,
  } = useNotificationsFeed();

  return (
    <div className="flex min-h-dvh flex-col px-4 pb-28 pt-6">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label={t("common.back")}
        className="mb-2 -ml-2 flex h-9 w-9 items-center justify-center text-dark"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm text-brand-gray">{t("notifications.label")}</p>
          <h1 className="text-3xl font-bold text-dark">
            {t("notifications.title")}
          </h1>
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            disabled={isMarkingAll}
            className="flex-shrink-0 rounded-full border border-dark/10 px-3.5 py-2 text-xs font-bold text-brand-purple disabled:opacity-50"
          >
            {t("notifications.markAllRead")}
          </button>
        )}
      </div>

      {isEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 pb-16">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-brand-purple/10">
            <Bell size={40} className="text-brand-purple" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xl font-bold text-dark">
              {t("notifications.empty.title")}
            </p>
            <p className="text-center text-sm text-brand-gray">
              {t("notifications.empty.hint")}
            </p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl bg-white">
          {isLoading
            ? null
            : notifications.map((notification) => (
                <NotificationRow
                  key={notification.id}
                  notification={notification}
                  onRead={markOneRead}
                />
              ))}
        </div>
      )}
    </div>
  );
}
