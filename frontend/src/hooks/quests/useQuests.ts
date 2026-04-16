import { useQuery } from "@tanstack/react-query";
import { getQuests } from "../../api/quests";

const useQuests = () => {
  return useQuery({
    queryKey: ["quests"],
    queryFn: getQuests,
  });
};

export default useQuests;
