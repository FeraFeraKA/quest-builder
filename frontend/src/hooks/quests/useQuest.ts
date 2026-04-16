import { useQuery } from "@tanstack/react-query";
import { getQuest, type TQuestID } from "../../api/quests";

const useQuest = (id: TQuestID) => {
  return useQuery({
    queryKey: [`quest/${id}`],
    queryFn: () => getQuest(id),
  });
};

export default useQuest;
