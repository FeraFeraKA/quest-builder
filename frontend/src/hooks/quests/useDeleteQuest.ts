import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuest, type TQuestID } from "../../api/quests";

const useDeleteQuest = (id: TQuestID) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteQuest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quests"] });
    },
  });
};

export default useDeleteQuest;
