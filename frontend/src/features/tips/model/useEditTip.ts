import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tipApi, tipsKey } from "@/entities/tip";
import { publicProfileKey } from "@/entities/user";
import { useLocale, useTranslation } from "@/shared/i18n";
import { useToast } from "@/shared/ui";

export function useEditTip() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const locale = useLocale();

  return useMutation({
    mutationFn: (input: { id: number; note: string }) =>
      tipApi.update(input, locale),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tipsKey });
      queryClient.invalidateQueries({ queryKey: publicProfileKey });
      showToast(t("toast.tipUpdated"));
    },
  });
}
