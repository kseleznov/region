"use client";

import { Search } from "@/shared/ui";
import { useTranslation } from "@/shared/i18n";

export function SearchCity() {
  const { t } = useTranslation();

  return (
    <div>
      <Search placeholder={t("region.searchPlaceholder")} />
    </div>
  );
}
