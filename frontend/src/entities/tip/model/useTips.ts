import { useQuery } from "@tanstack/react-query";
import { useLocale } from "@/shared/i18n";
import { tipApi } from "../api/tipApi";

export const tipsKey = ["tips"] as const;

export function useTips() {
  const locale = useLocale();

  return useQuery({
    queryKey: [...tipsKey, locale],
    queryFn: () => tipApi.getMine(locale),
  });
}
