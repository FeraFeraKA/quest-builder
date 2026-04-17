import { useMutation } from "@tanstack/react-query";
import { deleteNode, type TNodeId } from "../../api/nodes";

const useDeleteNode = () => {
  return useMutation({
    mutationFn: (nodeId: TNodeId) => deleteNode(nodeId),
  });
};

export default useDeleteNode;
