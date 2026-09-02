import { useQuery } from "@tanstack/react-query";
import { rankApi } from "../api/rankApi";

export const userProgressKey = ["userProgress"] as const;

interface UseUserProgressOptions {
  /** Gate the request on an authenticated session — progress needs a user. */
  enabled?: boolean;
}

export function useUserProgress({
  enabled = true,
}: UseUserProgressOptions = {}) {
  return useQuery({
    queryKey: userProgressKey,
    queryFn: rankApi.getUserProgress,
    enabled,
  });
}
