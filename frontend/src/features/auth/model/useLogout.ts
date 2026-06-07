import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/authApi";
import { useAuthStore } from "./useAuthStore";
import { ROUTES } from "@/shared/config/routes";

export function useLogout() {
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearUser();
      router.push(ROUTES.signIn);
    },
    onError: () => {
      clearUser();
      router.push(ROUTES.signIn);
    },
  });

  return { logout, isPending };
}
