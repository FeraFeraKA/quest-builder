import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../api/auth";

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export default useLogin;
