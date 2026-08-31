import { ROUTES } from "@/shared/config/routes";
import type { TranslationKey } from "@/shared/i18n";
import { Compass, Heart, Home, User, type LucideIcon } from "lucide-react";

interface NavItem {
  icon: LucideIcon;
  href: string;
  labelKey: TranslationKey;
}

export const NAV_ITEMS: NavItem[] = [
  { icon: Home, href: ROUTES.overview, labelKey: "nav.home" },
  { icon: Compass, href: ROUTES.exploring, labelKey: "nav.explore" },
  { icon: Heart, href: ROUTES.saved, labelKey: "nav.saved" },
  { icon: User, href: ROUTES.profile, labelKey: "nav.profile" },
];

export const HIDDEN_ROUTES = [ROUTES.home, ROUTES.greeting, ROUTES.region];
