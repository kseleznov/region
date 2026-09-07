import { useQuery } from "@tanstack/react-query";
import { useLocale } from "@/shared/i18n";
import { userApi } from "../api/userApi";

export const publicProfileKey = ["publicProfile"] as const;

export function usePublicProfile(username: string) {
  const locale = useLocale();

  return useQuery({
    queryKey: [...publicProfileKey, username, locale],
    queryFn: () => userApi.getPublicProfile(username, locale),
    enabled: !!username,
  });
}
