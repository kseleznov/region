import {
  Bell,
  CreditCard,
  HelpCircle,
  Languages,
  type LucideIcon,
} from "lucide-react";
import type { TranslationKey } from "@/shared/i18n";

export type ProfileMenuId = "notifications" | "language" | "payment" | "help";

export interface ProfileMenuItem {
  id: ProfileMenuId;
  icon: LucideIcon;
  labelKey: TranslationKey;
}

export const MENU_ITEMS: ProfileMenuItem[] = [
  { id: "language", icon: Languages, labelKey: "profile.menu.language" },
];
