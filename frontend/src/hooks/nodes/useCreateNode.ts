import { useMutation } from "@tanstack/react-query";
import { createNode, type INodeCreate } from "../../api/nodes";

const useCreateNode = () => {
  return useMutation({
    mutationFn: ({
      questId,
      title,
      description,
      positionX,
      positionY,
    }: INodeCreate) =>
      createNode({
        questId,
        title,
        description,
        positionX,
        positionY,
      }),
  });
};

export default useCreateNode;
