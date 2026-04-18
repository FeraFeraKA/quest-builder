import { useMutation } from "@tanstack/react-query";
import { setStartNode, type ISetStartNode } from "../../api/quests";

const useSetStartNode = () => {
  return useMutation({
    mutationFn: ({ questId, startNodeId }: ISetStartNode) =>
      setStartNode({ questId, startNodeId }),
  });
};

export default useSetStartNode;
