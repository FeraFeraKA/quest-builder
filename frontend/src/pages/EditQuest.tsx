import { useEffect, useState } from "react";
import type { TQuestId } from "../api/quests";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import useGetQuest from "../hooks/quests/useGetQuest";
import useUpdateQuest from "../hooks/quests/useUpdateQuest";
import useTimeout from "../hooks/useTimeout";

interface IEditQuestProps {
  questId: TQuestId;
  handleEditModal: (flag: boolean) => void;
}

const EditQuest = ({ questId, handleEditModal }: IEditQuestProps) => {
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
      <div className="flex flex-col items-center text-center fixed inset-0 z-20">
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => handleEditModal(false)}
        ></div>

        <div className="my-auto z-20">
          <h1>Обновить квест</h1>
          <form
            className="flex flex-col gap-4 mt-4 justify-center items-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Input
              label="Название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="flex flex-col ">
              <span className="text-xl md:text-2xl">Описание</span>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
              />
            </label>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Button text="Обновить" type="submit" />
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
