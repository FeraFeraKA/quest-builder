import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEdge, type ICreateEdge } from "../../api/edges";
import type { TQuestId } from "../../api/quests";

const useCreateEdge = (questId: TQuestId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ nodeFromId, nodeToId }: Omit<ICreateEdge, "questId">) =>
      createEdge({ questId, nodeFromId, nodeToId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quest", questId] });
    },
  });
};

export default useCreateEdge;
