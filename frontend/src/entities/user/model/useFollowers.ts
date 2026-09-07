import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/userApi";

export const followersKey = ["followers"] as const;

export function useFollowers() {
  return useQuery({
    queryKey: followersKey,
    queryFn: userApi.getFollowers,
  });
}
