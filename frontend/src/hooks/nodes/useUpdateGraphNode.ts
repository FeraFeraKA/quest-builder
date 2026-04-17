import { useMutation } from "@tanstack/react-query";
import { updateGraphNode, type INodeUpdate } from "../../api/nodes";

const useUpdateGraphNode = () => {
  return useMutation({
    mutationFn: ({ nodeId, positionX, positionY }: INodeUpdate) =>
      updateGraphNode({ nodeId, positionX, positionY }),
  });
};

export default useUpdateGraphNode;
