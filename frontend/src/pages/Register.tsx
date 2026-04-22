import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LinkButton from "../components/ui/LinkButton";
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
      <div
        className="absolute inset-0 -z-50 h-screen
        bg-[url(/images/bg.png)] bg-repeat bg-top [image-rendering:pixelated]"
      ></div>
      <div className="text-center flex flex-col items-center ">
        <h1 className="font-pixel text-green-300">Регистрация</h1>
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
            text={
              registerMutation.isPending ? "Загрузка..." : "Зарегистрироваться"
            }
            disabled={registerMutation.isPending}
            type="submit"
          />
        </form>
        <LinkButton
          text="Назад"
          url="/"
          textSize="text-md md:text-xl"
        />
        {registerMutation.isError && (
          <p className="mt-4">{registerMutation.error.message}</p>
        )}
      </div>
    </>
  );
};

export default Register;

