import { useMutation } from "@tanstack/react-query";
import { deleteEdge, type TEdgeId } from "../../api/edges";

const useDeleteEdge = () => {
  return useMutation({
    mutationFn: (edgeId: TEdgeId) => deleteEdge(edgeId),
  });
};

export default useDeleteEdge;
