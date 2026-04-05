import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/auth";

const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export default useLogin;
