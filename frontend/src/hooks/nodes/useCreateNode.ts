import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNode, type INodeCreate } from "../../api/nodes";
import type { TQuestId } from "../../api/quests";

const useCreateNode = (questId: TQuestId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      title,
      description,
      positionX,
      positionY,
    }: Omit<INodeCreate, "questId">) =>
      createNode({
        questId,
        title,
        description,
        positionX,
        positionY,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quest", questId] });
    },
    meta: {
      skipGlobalLoader: true,
    },
  });
};

export default useCreateNode;
