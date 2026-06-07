import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/routes";

export function useGreetingWindow() {
  const router = useRouter();

  function onClick() {
    router.push(ROUTES.region);
  }

  return {
    onClick,
  };
}
