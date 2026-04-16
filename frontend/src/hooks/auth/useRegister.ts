import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../../api/auth";

const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export default useRegister;
