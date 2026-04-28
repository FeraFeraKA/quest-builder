import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { TQuestId } from "../api/quests";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import { submitFormOnModEnter } from "../helpers/submitTextarea";
import useGetQuest from "../hooks/quests/useGetQuest";
import useUpdateQuest from "../hooks/quests/useUpdateQuest";
import useTimeout from "../hooks/useTimeout";

interface IEditQuestProps {
  questId: TQuestId;
  handleEditModal: (flag: boolean) => void;
}

const EditQuest = ({ questId, handleEditModal }: IEditQuestProps) => {
  const { t } = useTranslation();
  const { data: quest } = useGetQuest(questId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [log, setLog] = useState("");
  const updateQuestMutation = useUpdateQuest();
  const { startTimeout, clearTimeoutSafe } = useTimeout();
  const titleRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateQuestMutation.mutate(
      { questId, title, description },
      {
        onSuccess: () => {
          clearTimeoutSafe();
          setLog(t("quests:editQuest.success"));
          startTimeout(() => {
            setLog("");
          }, 5000);
        },
      },
    );
  };

  useEffect(() => {
    if (!quest) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTitle(quest.title);
    setDescription(quest.description);
  }, [quest]);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center text-center fixed inset-0 z-20">
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => handleEditModal(false)}
        ></div>

        <div className="my-auto z-20">
          <h1>{t("quests:editQuest.title")}</h1>
          <form
            className="flex flex-col gap-4 mt-4 justify-center items-center"
            onSubmit={(e) => handleSubmit(e)}
            onKeyDown={(e) => {
              if (e.key === "Escape") handleEditModal(false);
            }}
          >
            <Input
              label={t("common:labels.title")}
              value={title}
              ref={titleRef}
              onChange={(e) => setTitle(e.target.value)}
            />
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
                  updateQuestMutation.isPending
                    ? t("quests:editQuest.updating")
                    : t("common:actions.update")
                }
                type="submit"
                disabled={updateQuestMutation.isPending}
              />
              <Button
                text={t("common:actions.back")}
                onClick={() => handleEditModal(false)}
              />
            </div>
            {log ? <p>{log}</p> : null}
            {updateQuestMutation.isError ? (
              <p>{updateQuestMutation.error.message}</p>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
};

export default EditQuest;
