import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuest, type TQuestId } from "../../api/quests";

const useDeleteQuest = (id: TQuestId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteQuest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quests"] });
    },
  });
};

export default useDeleteQuest;
