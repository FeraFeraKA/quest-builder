import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LinkButton from "../components/ui/LinkButton";
import useCreateQuest from "../hooks/quests/useCreateQuest";

const CreateQuest = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [log, setLog] = useState("");
  const questMutation = useCreateQuest();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    questMutation.mutate(
      { title, description },
      {
        onSuccess: () => {
          setLog("Квест успешно добавлен!");
          setTitle("");
          setDescription("");
          setTimeout(() => {
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
          <div className="flex flex-row gap-4">
            <Button text="Создать" type="submit" />
            <LinkButton text="Назад" url="/quests" />
          </div>
          <p>{log ? log : questMutation.error?.message}</p>
        </form>
      </div>
    </>
  );
};

export default CreateQuest;
