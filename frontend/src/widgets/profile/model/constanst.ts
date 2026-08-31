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
  { id: "notifications", icon: Bell, labelKey: "profile.menu.notifications" },
  { id: "language", icon: Languages, labelKey: "profile.menu.language" },
  { id: "payment", icon: CreditCard, labelKey: "profile.menu.payment" },
  { id: "help", icon: HelpCircle, labelKey: "profile.menu.help" },
];
