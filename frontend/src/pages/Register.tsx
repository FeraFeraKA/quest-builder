import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useRegister from "../hooks/auth/useRegister";

const Register = () => {
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    registerMutation.mutate(
      {
        nickname,
        password,
      },
      {
        onSuccess: () => {
          navigate("/quests");
        },
      },
    );
  };

  return (
    <>
      <div className="my-4 text-center flex flex-col items-center">
        <h1 className="text-3xl">Register</h1>
        <form
          className="flex flex-col my-4 gap-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label>
            Nickname
            <input
              className="ml-2 border-2"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              className="ml-2 border-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            disabled={registerMutation.isPending}
            type="submit"
            className="cursor-pointer p-3 border-2 border-blue-300"
          >
            {registerMutation.isPending ? "Загрузка..." : "Зарегистрироваться"}
          </button>
          <Link to="/" className="cursor-pointer p-3 border-2 border-blue-300">
            Back
          </Link>
          {registerMutation.isError && <p>{registerMutation.error.message}</p>}
        </form>
      </div>
    </>
  );
};

export default Register;
