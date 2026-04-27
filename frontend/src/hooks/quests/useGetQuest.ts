import { useQuery } from "@tanstack/react-query";
import { getQuest, type TQuestId } from "../../api/quests";

const useGetQuest = (id: TQuestId) => {
  return useQuery({
    queryKey: [`quest`, id],
    queryFn: () => getQuest(id),
    meta: {
      skipGlobalLoader: true,
    },
  });
};

export default useGetQuest;
