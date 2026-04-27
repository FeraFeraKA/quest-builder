import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  setStartNode,
  type ISetStartNode,
  type TQuestId,
} from "../../api/quests";

const useSetStartNode = (questId: TQuestId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ startNodeId }: ISetStartNode) =>
      setStartNode({ questId, startNodeId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quest", questId] });
    },
    meta: {
      skipGlobalLoader: true,
    },
  });
};

export default useSetStartNode;
