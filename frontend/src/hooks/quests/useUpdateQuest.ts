import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuest, type IUpdateQuest } from "../../api/quests";

const useUpdateQuest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questId, title, description }: IUpdateQuest) =>
      updateQuest({
        questId,
        title,
        description,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quests"] });
    },
  });
};

export default useUpdateQuest;
