import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNode, type INodeUpdate } from "../../api/nodes";
import type { TQuestId } from "../../api/quests";

const useUpdateNode = (questId: TQuestId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ nodeId, title, description }: INodeUpdate) =>
      updateNode({
        nodeId,
        title,
        description,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quest", questId] });
    },
  });
};

export default useUpdateNode;
