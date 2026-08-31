"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, LogIn, LogOut, Settings } from "lucide-react";
import { MENU_ITEMS } from "../model/constanst";
import { LanguageSheet } from "./LanguageSheet";
import { useAuthStore, useLogout } from "@/features/auth";
import { ROUTES } from "@/shared/config/routes";
import { LOCALE_LABELS, useTranslation } from "@/shared/i18n";

export function Profile() {
  const user = useAuthStore((state) => state.user);
  const { logout, isPending } = useLogout();
  const { t, locale } = useTranslation();
  const [languageSheetOpen, setLanguageSheetOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-8">
      <div>
        <p className="text-sm text-brand-gray">{t("profile.accountLabel")}</p>
        <h1 className="text-3xl font-bold text-dark">{t("profile.title")}</h1>
      </div>

      <div className="flex items-center justify-between bg-brand-purple rounded-2xl px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-brand-yellow flex items-center justify-center">
            <span className="text-2xl font-bold text-dark">
              {user?.name?.[0]?.toUpperCase() ?? "?"}
            </span>
          </div>
          <div>
            <p className="text-lg font-bold text-light">{user?.name ?? "—"}</p>
            <p className="text-sm text-light/80">{user?.email ?? "—"}</p>
          </div>
        </div>
        <button
          aria-label={t("profile.settings")}
          className="w-10 h-10 rounded-full bg-light/20 flex items-center justify-center"
        >
          <Settings size={20} className="text-light" />
        </button>
      </div>

      <div className="bg-search-bg rounded-2xl divide-y divide-gray-200">
        {MENU_ITEMS.map(({ id, icon: Icon, labelKey }) => {
          const isLanguage = id === "language";
          return (
            <button
              key={id}
              onClick={
                isLanguage ? () => setLanguageSheetOpen(true) : undefined
              }
              className="flex items-center justify-between w-full px-4 py-4 first:rounded-t-2xl last:rounded-b-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-dark/20 flex items-center justify-center">
                  <Icon size={16} className="text-dark" />
                </div>
                <span className="font-medium text-dark">{t(labelKey)}</span>
              </div>
              <div className="flex items-center gap-1 text-brand-gray">
                {isLanguage && (
                  <span className="text-sm">{LOCALE_LABELS[locale]}</span>
                )}
                <ChevronRight size={20} />
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-search-bg rounded-2xl">
        {user ? (
          <button
            className="flex items-center gap-3 w-full px-4 py-4 disabled:opacity-50"
            onClick={() => logout()}
            disabled={isPending}
          >
            <LogOut size={20} className="text-brand-pink" />
            <span className="font-medium text-brand-pink">
              {t("profile.logOut")}
            </span>
          </button>
        ) : (
          <Link
            href={ROUTES.signIn}
            className="flex items-center gap-3 w-full px-4 py-4"
          >
            <LogIn size={20} className="text-brand-purple" />
            <span className="font-medium text-brand-purple">
              {t("profile.signIn")}
            </span>
          </Link>
        )}
      </div>

      <LanguageSheet
        isOpen={languageSheetOpen}
        onClose={() => setLanguageSheetOpen(false)}
      />
    </div>
  );
}
