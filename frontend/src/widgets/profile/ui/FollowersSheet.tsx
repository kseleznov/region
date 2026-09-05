"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import { ROUTES } from "@/shared/config/routes";
import { useTranslation } from "@/shared/i18n";
import { useResetOnOpen } from "../model/useResetOnOpen";
import type { FollowedUser } from "@/entities/user";
import type { FollowersTab } from "../model/types";

interface FollowersSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: FollowersTab;
  followers: FollowedUser[];
  following: FollowedUser[];
  onUnfollow: (username: string) => void;
}

function PersonRow({
  person,
  action,
}: {
  person: FollowedUser;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Link
        href={ROUTES.publicProfile(person.username)}
        className="flex flex-1 min-w-0 items-center gap-3"
      >
        <div className="w-11 h-11 rounded-full bg-brand-yellow flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-bold text-dark">
            {person.name[0]?.toUpperCase() ?? "?"}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-bold text-dark truncate">{person.name}</p>
          <p className="text-sm text-brand-gray truncate">@{person.username}</p>
        </div>
      </Link>
      {action}
    </div>
  );
}

export function FollowersSheet({
  isOpen,
  onClose,
  initialTab,
  followers,
  following,
  onUnfollow,
}: FollowersSheetProps) {
  const { t } = useTranslation();
  const [tab, setTab] = useState<FollowersTab>(initialTab);

  useResetOnOpen(isOpen, () => setTab(initialTab));

  const list = tab === "followers" ? followers : following;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center"
          initial={{ backgroundColor: "rgba(0,0,0,0)" }}
          animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-[452px] h-[70vh] flex flex-col rounded-t-3xl bg-white px-4 pt-5 pb-8"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex gap-1 bg-search-bg rounded-full p-1 mb-2 flex-shrink-0">
              {(["followers", "following"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setTab(option)}
                  className={cn(
                    "flex-1 rounded-full py-2.5 text-sm font-bold transition-colors",
                    tab === option
                      ? "bg-brand-purple text-light"
                      : "text-brand-gray",
                  )}
                >
                  {t(`profile.followersSheet.tabs.${option}`)} (
                  {option === "followers" ? followers.length : following.length}
                  )
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 [&::-webkit-scrollbar]:hidden">
              {list.length === 0 ? (
                <p className="text-sm text-brand-gray text-center py-8">
                  {t("profile.followersSheet.empty")}
                </p>
              ) : (
                list.map((person) => (
                  <PersonRow
                    key={person.id}
                    person={person}
                    action={
                      tab === "following" ? (
                        <button
                          onClick={() => onUnfollow(person.username)}
                          className="flex-shrink-0 rounded-full border border-dark/10 px-3.5 py-2 text-xs font-bold text-dark"
                        >
                          {t("profile.followersSheet.unfollow")}
                        </button>
                      ) : undefined
                    }
                  />
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
