"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useTranslation } from "@/shared/i18n";

export function ProfileTopBar() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => router.back()}
        aria-label={t("publicProfile.aria.back")}
        className="w-10 h-10 rounded-full bg-search-bg flex items-center justify-center"
      >
        <ChevronLeft size={20} className="text-dark" />
      </button>
    </div>
  );
}
