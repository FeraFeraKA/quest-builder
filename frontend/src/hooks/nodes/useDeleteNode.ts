import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNode, type TNodeId } from "../../api/nodes";
import type { TQuestId } from "../../api/quests";

const useDeleteNode = (questId: TQuestId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nodeId: TNodeId) => deleteNode(nodeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quest", questId] });
    },
    meta: {
      skipGlobalLoader: true,
    },
  });
};

export default useDeleteNode;
