import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  userApi,
  publicProfileKey,
  followersKey,
  followingKey,
} from "@/entities/user";

export function useToggleFollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (username: string) => userApi.toggleFollow(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: publicProfileKey });
      queryClient.invalidateQueries({ queryKey: followersKey });
      queryClient.invalidateQueries({ queryKey: followingKey });
    },
  });
}
