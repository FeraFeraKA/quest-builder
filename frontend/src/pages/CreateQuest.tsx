import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import { submitFormOnModEnter } from "../helpers/submitTextarea";
import useCreateQuest from "../hooks/quests/useCreateQuest";
import useTimeout from "../hooks/useTimeout";

interface ICreateQuestProps {
  handleCloseModal: () => void;
}

const CreateQuest = ({ handleCloseModal }: ICreateQuestProps) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [log, setLog] = useState("");
  const createQuestMutation = useCreateQuest();
  const { startTimeout, clearTimeoutSafe } = useTimeout();
  const titleRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    createQuestMutation.mutate(
      { title, description },
      {
        onSuccess: () => {
          clearTimeoutSafe();
          setLog(t("quests:createQuest.success"));
          setTitle("");
          setDescription("");
          startTimeout(() => {
            setLog("");
          }, 5000);
        },
      },
    );
  };

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center text-center fixed inset-0 z-20">
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={handleCloseModal}
        ></div>

        <div className="my-auto z-20">
          <h1>{t("quests:createQuest.title")}</h1>
          <form
            className="flex flex-col gap-4 mt-4 justify-center items-stretch"
            onSubmit={(e) => handleSubmit(e)}
            onKeyDown={(e) => {
              if (e.key === "Escape") handleCloseModal();
            }}
          >
            <div className="self-center">
              <Input
                label={t("common:labels.title")}
                value={title}
                ref={titleRef}
                onChange={(e) => setTitle(e.target.value)}
                mt="mt-2"
              />
            </div>

            <label className="flex flex-col ">
              <span className="text-xl md:text-2xl">
                {t("common:labels.description")}
              </span>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                onKeyDown={submitFormOnModEnter}
              />
            </label>

            <div className="flex flex-col gap-4 items-center justify-center">
              <Button
                text={
                  createQuestMutation.isPending
                    ? t("quests:createQuest.creating")
                    : t("common:actions.create")
                }
                type="submit"
                disabled={createQuestMutation.isPending}
              />
              <Button
                text={t("common:actions.back")}
                onClick={handleCloseModal}
              />
            </div>
            {log ? <p>{log}</p> : null}
            {createQuestMutation.isError ? (
              <p>{createQuestMutation.error.message}</p>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateQuest;
