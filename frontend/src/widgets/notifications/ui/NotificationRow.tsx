"use client";

import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import { formatRelativeTime } from "@/shared/lib/formatRelativeTime";
import { ROUTES } from "@/shared/config/routes";
import { useTranslation } from "@/shared/i18n";
import type { AppNotification } from "@/entities/notification";

interface NotificationRowProps {
  notification: AppNotification;
  onRead: (id: number) => void;
}

export function NotificationRow({
  notification,
  onRead,
}: NotificationRowProps) {
  const { t, locale } = useTranslation();
  const { actor } = notification;
  const name = actor?.name ?? "";

  const body = (
    <>
      <div className="relative flex-shrink-0">
        <div className="w-11 h-11 rounded-full bg-brand-yellow flex items-center justify-center">
          <span className="text-lg font-bold text-dark">
            {name[0]?.toUpperCase() ?? "?"}
          </span>
        </div>
        {!notification.read && (
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-brand-purple" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm text-dark">
          <span className="font-bold">{name}</span>{" "}
          {t("notifications.follow.action")}
        </p>
        <p className="mt-0.5 text-xs text-brand-gray">
          {formatRelativeTime(notification.createdAt, locale)}
        </p>
      </div>
    </>
  );

  const className = cn(
    "flex items-center gap-3 px-4 py-3 transition-colors",
    !notification.read && "bg-brand-purple/5",
  );

  if (notification.type === "follow" && actor) {
    return (
      <Link
        href={ROUTES.publicProfile(actor.username)}
        onClick={() => onRead(notification.id)}
        className={className}
      >
        {body}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onRead(notification.id)}
      className={cn(className, "w-full text-left")}
    >
      {body}
    </button>
  );
}
