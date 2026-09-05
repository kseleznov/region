"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ChevronRight, LogIn, LogOut, Pencil } from "lucide-react";
import { MENU_ITEMS } from "../model/constanst";
import { useProfileSettings } from "../model/useProfileSettings";
import { usePlaceDetail } from "../model/usePlaceDetail";
import type { FollowersTab } from "../model/types";
import { LanguageSheet } from "./LanguageSheet";
import { EditProfileSheet } from "./EditProfileSheet";
import { FollowersSheet } from "./FollowersSheet";
import { MyTips } from "./MyTips";
import { AllTipsSheet } from "./AllTipsSheet";
import { CardDetail } from "@/entities/card";
import { useAuthStore, useLogout } from "@/features/auth";
import { ROUTES } from "@/shared/config/routes";
import { LOCALE_LABELS, useTranslation } from "@/shared/i18n";

export function Profile() {
  const user = useAuthStore((state) => state.user);
  const { logout, isPending } = useLogout();
  const { t, locale } = useTranslation();
  const [languageSheetOpen, setLanguageSheetOpen] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [allTipsSheetOpen, setAllTipsSheetOpen] = useState(false);
  const [followersSheet, setFollowersSheet] = useState<FollowersTab | null>(
    null,
  );

  const {
    name,
    username,
    bio,
    followers,
    following,
    tips,
    updateProfile,
    unfollow,
    removeTip,
  } = useProfileSettings();

  const {
    selected,
    isSelectedSaved,
    isSelectedVisited,
    openPlace,
    selectSimilar,
    closeSelected,
    toggleSaveSelected,
    toggleVisitSelected,
    addTipForSelected,
  } = usePlaceDetail();

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-8">
      <div>
        <p className="text-sm text-brand-gray">{t("profile.accountLabel")}</p>
        <h1 className="text-3xl font-bold text-dark">{t("profile.title")}</h1>
      </div>

      <div className="relative bg-brand-purple rounded-2xl p-4 flex flex-col gap-4">
        <button
          onClick={() => setEditSheetOpen(true)}
          aria-label={t("profile.editProfile")}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-light/20 flex items-center justify-center"
        >
          <Pencil size={16} className="text-light" />
        </button>

        <div className="flex items-center gap-4 pr-12">
          <div className="w-14 h-14 rounded-xl bg-brand-yellow flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-dark">
              {name?.[0]?.toUpperCase() ?? "?"}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-lg font-bold text-light truncate">
              {name || "—"}
            </p>
            <p className="text-sm text-light/70 truncate">@{username}</p>
          </div>
        </div>

        {bio && <p className="text-sm text-light/90 leading-relaxed">{bio}</p>}

        <div className="flex items-center gap-5">
          <button
            onClick={() => setFollowersSheet("followers")}
            className="text-left"
          >
            <span className="text-lg font-bold text-light">
              {followers.length}
            </span>{" "}
            <span className="text-sm text-light/70">
              {t("profile.followersSheet.tabs.followers")}
            </span>
          </button>
          <button
            onClick={() => setFollowersSheet("following")}
            className="text-left"
          >
            <span className="text-lg font-bold text-light">
              {following.length}
            </span>{" "}
            <span className="text-sm text-light/70">
              {t("profile.followersSheet.tabs.following")}
            </span>
          </button>
        </div>
      </div>

      <MyTips
        tips={tips}
        onShowAllClick={() => setAllTipsSheetOpen(true)}
        onOpenPlace={openPlace}
      />

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

      <EditProfileSheet
        isOpen={editSheetOpen}
        onClose={() => setEditSheetOpen(false)}
        name={name}
        username={username}
        bio={bio}
        onSave={updateProfile}
      />

      <FollowersSheet
        isOpen={followersSheet !== null}
        onClose={() => setFollowersSheet(null)}
        initialTab={followersSheet ?? "followers"}
        followers={followers}
        following={following}
        onUnfollow={unfollow}
      />

      <AllTipsSheet
        isOpen={allTipsSheetOpen}
        onClose={() => setAllTipsSheetOpen(false)}
        tips={tips}
        onRemove={removeTip}
        onOpenPlace={openPlace}
      />

      <AnimatePresence>
        {selected && (
          <CardDetail
            key={selected.card.id ?? selected.card.name}
            card={selected.card}
            sourceRect={selected.rect}
            isSaved={isSelectedSaved}
            isVisited={isSelectedVisited}
            onClose={closeSelected}
            onToggleSave={toggleSaveSelected}
            onToggleVisit={toggleVisitSelected}
            onSelectSimilar={selectSimilar}
            onAddTip={addTipForSelected}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
