import { useMutation } from "@tanstack/react-query";
import { updateNode, type INodeUpdate } from "../../api/nodes";

const useUpdateNode = () => {
  return useMutation({
    mutationFn: ({ nodeId, title, description }: INodeUpdate) =>
      updateNode({
        nodeId,
        title,
        description,
      }),
  });
};

export default useUpdateNode;
