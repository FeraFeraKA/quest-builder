import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/auth";
import { ApiError } from "../../helpers/apiError";

const useMe = () => {
  return useQuery({
    queryFn: () => getMe({ notifyOnAuthExpired: false }),
    queryKey: ["me"],
    retry: (count, error) => {
      if (error instanceof ApiError && error.status === 401) return false;
      return count < 3;
    },
    meta: {
      skipGlobalLoader: true,
    },
  });
};

export default useMe;
