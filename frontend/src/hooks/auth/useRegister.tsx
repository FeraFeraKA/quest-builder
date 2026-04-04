import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/auth";

const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export default useRegister;
