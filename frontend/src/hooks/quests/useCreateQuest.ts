import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuest } from "../../api/quests";

const useCreateQuest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quests"] });
    },
  });
};

export default useCreateQuest;
