import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeApi, placesKey } from "@/entities/place";
import { getRank, rankApi, userProgressKey } from "@/entities/rank";
import { useTranslation } from "@/shared/i18n";
import { useToast } from "@/shared/ui";
import { useRankProgress } from "../ui/RankProgressProvider";

export function useToggleVisit() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { announceVisit } = useRankProgress();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: placeApi.toggleVisit,
    onSuccess: async ({ isVisited }) => {
      queryClient.invalidateQueries({ queryKey: placesKey });

      if (!isVisited) {
        queryClient.invalidateQueries({ queryKey: userProgressKey });
        showToast(t("toast.unvisited"));
        return;
      }

      // Marking a place visited just bumped the count by one — pull the fresh
      // total so the card can show the real progress toward the next rank.
      const progress = await queryClient.fetchQuery({
        queryKey: userProgressKey,
        queryFn: rankApi.getUserProgress,
      });

      const rankedUp =
        getRank(progress.placesVisited).key !==
        getRank(progress.placesVisited - 1).key;

      announceVisit({ placesVisited: progress.placesVisited, rankedUp });
    },
  });
}
