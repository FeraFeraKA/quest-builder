import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEdge, type TEdgeId } from "../../api/edges";
import type { TQuestId } from "../../api/quests";

const useDeleteEdge = (questId: TQuestId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (edgeId: TEdgeId) => deleteEdge(edgeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quest", questId] });
    },
  });
};

export default useDeleteEdge;
