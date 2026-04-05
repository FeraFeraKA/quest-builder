import { useQuery } from "@tanstack/react-query";
import { getQuests } from "../../api/quest";

const useQuests = () => {
  return useQuery({
    queryKey: ["quests"],
    queryFn: getQuests,
  });
};

export default useQuests;
