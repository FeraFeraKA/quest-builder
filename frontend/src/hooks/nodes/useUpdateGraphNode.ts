import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGraphNode, type INodeUpdate } from "../../api/nodes";
import type { TQuestId } from "../../api/quests";

const useUpdateGraphNode = (questId: TQuestId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ nodeId, positionX, positionY }: INodeUpdate) =>
      updateGraphNode({ nodeId, positionX, positionY }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quest", questId] });
    },
        meta: {
      skipGlobalLoader: true,
    },
  });
};

export default useUpdateGraphNode;
