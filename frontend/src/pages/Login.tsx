import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LinkButton from "../components/ui/LinkButton";
import useLogin from "../hooks/auth/useLogin";

const Login = () => {
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    loginMutation.mutate(
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
      <div
        className="absolute inset-0 -z-50 h-screen
        bg-[url(/images/bg.png)] bg-repeat bg-top [image-rendering:pixelated]"
      ></div>
      <div className="my-4 text-center flex flex-col items-center ">
        <h1 className="font-pixel text-green-300">Авторизация</h1>
        <form
          className="flex flex-col items-center my-4 gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Input
            label="Никнейм"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Input
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            text={loginMutation.isPending ? "Загрузка..." : "Войти"}
            disabled={loginMutation.isPending}
            type="submit"
          />
        </form>
        <LinkButton text="Назад" url="/" />
        {loginMutation.isError && (
          <p className="mt-4">{loginMutation.error.message}</p>
        )}
      </div>
    </>
  );
};

export default Login;
