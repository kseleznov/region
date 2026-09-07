import { useMutation } from "@tanstack/react-query";
import { userApi, type UpdateMeInput } from "@/entities/user";
import { useTranslation } from "@/shared/i18n";
import { useToast } from "@/shared/ui";
import { useAuthStore } from "./useAuthStore";

export function useUpdateProfile() {
  const setUser = useAuthStore((state) => state.setUser);
  const { showToast } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (input: UpdateMeInput) => userApi.updateMe(input),
    onSuccess: (user) => {
      setUser(user);
      showToast(t("toast.profileUpdated"));
    },
  });
}
