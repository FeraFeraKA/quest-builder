import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LinkButton from "../components/ui/LinkButton";
import useRegister from "../hooks/auth/useRegister";

const Register = () => {
  const { t } = useTranslation();
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const titleId = useId();

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
      <div
        className="text-center flex flex-col items-center "
        aria-labelledby={titleId}
      >
        <h1 id={titleId} className="font-pixel text-green-300">
          {t("common:auth.registerTitle")}
        </h1>
        <form
          className="flex flex-col items-center my-4 gap-4"
          onSubmit={(e) => handleSubmit(e)}
          aria-labelledby={titleId}
          aria-busy={registerMutation.isPending}
        >
          <Input
            label={t("common:labels.nickname")}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Input
            label={t("common:labels.password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            text={
              registerMutation.isPending
                ? t("common:actions.loading")
                : t("common:auth.registerAction")
            }
            disabled={registerMutation.isPending}
            type="submit"
          />
        </form>
        <LinkButton
          text={t("common:actions.back")}
          url="/"
          textSize="text-md md:text-xl"
        />
        {registerMutation.isError && (
          <p role="alert" className="mt-4">
            {registerMutation.error.message}
          </p>
        )}
      </div>
    </>
  );
};

export default Register;
