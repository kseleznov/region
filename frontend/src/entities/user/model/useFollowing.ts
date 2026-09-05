import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/userApi";

export const followingKey = ["following"] as const;

export function useFollowing() {
  return useQuery({
    queryKey: followingKey,
    queryFn: userApi.getFollowing,
  });
}
