import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../api/auth";

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export default useLogout;
