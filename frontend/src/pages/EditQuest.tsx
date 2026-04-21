import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LinkButton from "../components/ui/LinkButton";
import useGetQuest from "../hooks/quests/useGetQuest";
import useUpdateQuest from "../hooks/quests/useUpdateQuest";
import useTimeout from "../hooks/useTimeout";

const EditQuest = () => {
  const params = useParams();
  const questId = params.id!;
  const { data: quest } = useGetQuest(questId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [log, setLog] = useState("");
  const updateQuestMutation = useUpdateQuest();
  const { startTimeout, clearTimeoutSafe } = useTimeout();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateQuestMutation.mutate(
      { questId, title, description },
      {
        onSuccess: () => {
          clearTimeoutSafe();
          setLog("Квест успешно обновлён!");
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

  return (
    <>
      <div className="text-center mt-10">
        <h1>Создать квест</h1>
        <form
          className="flex flex-col gap-4 mt-4 justify-center items-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Input
            label="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Button text="Обновить" type="submit" />
            <LinkButton text="Назад" url="/quests" />
          </div>
          {log ? <p>{log}</p> : null}
          {updateQuestMutation.isError ? (
            <p>{updateQuestMutation.error.message}</p>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default EditQuest;
