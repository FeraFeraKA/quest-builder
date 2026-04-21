import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LinkButton from "../components/ui/LinkButton";
import useCreateQuest from "../hooks/quests/useCreateQuest";
import useTimeout from "../hooks/useTimeout";

const CreateQuest = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [log, setLog] = useState("");
  const questMutation = useCreateQuest();
  const { startTimeout, clearTimeoutSafe } = useTimeout();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    questMutation.mutate(
      { title, description },
      {
        onSuccess: () => {
          clearTimeoutSafe();
          setLog("Квест успешно добавлен!");
          setTitle("");
          setDescription("");
          startTimeout(() => {
            setLog("");
          }, 5000);
        },
      },
    );
  };

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
            <Button text="Создать" type="submit" />
            <LinkButton text="Назад" url="/quests" />
          </div>
          {log ? <p>{log}</p> : null}
          {questMutation.isError ? <p>{questMutation.error.message}</p> : null}
        </form>
      </div>
    </>
  );
};

export default CreateQuest;
