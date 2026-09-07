import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tipApi, tipsKey } from "@/entities/tip";
import { publicProfileKey } from "@/entities/user";
import { useTranslation } from "@/shared/i18n";
import { useToast } from "@/shared/ui";

export function useRemoveTip() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (id: number) => tipApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tipsKey });
      queryClient.invalidateQueries({ queryKey: publicProfileKey });
      showToast(t("toast.tipRemoved"));
    },
  });
}
