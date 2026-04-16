import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/auth";

const useMe = () => {
  return useQuery({
    queryFn: getMe,
    queryKey: ["me"],
  });
};

export default useMe;
