import { useQuery } from "@tanstack/react-query";
import { getQuests } from "../../api/quests";

const useGetQuests = () => {
  return useQuery({
    queryKey: ["quests"],
    queryFn: getQuests,
  });
};

export default useGetQuests;
