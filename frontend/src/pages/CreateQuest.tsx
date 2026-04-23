import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import useCreateQuest from "../hooks/quests/useCreateQuest";
import useTimeout from "../hooks/useTimeout";

interface ICreateQuestProps {
  handleCloseModal: () => void;
}

const CreateQuest = ({ handleCloseModal }: ICreateQuestProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [log, setLog] = useState("");
  const createQuestMutation = useCreateQuest();
  const { startTimeout, clearTimeoutSafe } = useTimeout();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    createQuestMutation.mutate(
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
      <div className="flex flex-col items-center text-center fixed inset-0 z-20">
        <div
          className="absolute inset-0 bg-black/50"
          onClick={handleCloseModal}
        ></div>

        <div className="my-auto z-20">
          <h1>Создать квест</h1>
          <form
            className="flex flex-col gap-4 mt-4 justify-center items-stretch"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="self-center">
              <Input
                label="Название"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                mt="mt-2"
              />
            </div>

            <label className="flex flex-col ">
              <span className="text-xl md:text-2xl">Описание</span>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
              />
            </label>

            <div className="flex items-center justify-center">
              <Button text="Создать" type="submit" />
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
