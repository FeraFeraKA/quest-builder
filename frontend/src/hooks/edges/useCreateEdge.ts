import { useMutation } from "@tanstack/react-query";
import { createEdge, type ICreateEdge } from "../../api/edges";

const useCreateEdge = () => {
  return useMutation({
    mutationFn: ({ questId, nodeFromId, nodeToId }: ICreateEdge) =>
      createEdge({ questId, nodeFromId, nodeToId }),
  });
};

export default useCreateEdge;
