import { ROUTES } from "@/shared/config/routes";
import { Compass, Heart, Home, User } from "lucide-react";

export const NAV_ITEMS = [
  { icon: Home, href: ROUTES.overview, label: "Home" },
  { icon: Compass, href: ROUTES.exploring, label: "Explore" },
  { icon: Heart, href: ROUTES.saved, label: "Saved" },
  { icon: User, href: ROUTES.profile, label: "Profile" },
] as const;

export const HIDDEN_ROUTES = [ROUTES.home, ROUTES.greeting, ROUTES.region];
