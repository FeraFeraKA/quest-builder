import { useQuery } from "@tanstack/react-query";
import { getQuest, type TQuestId } from "../../api/quests";

const useGetQuest = (id: TQuestId) => {
  return useQuery({
    queryKey: [`quest`, id],
    queryFn: () => getQuest(id),
  });
};

export default useGetQuest;
