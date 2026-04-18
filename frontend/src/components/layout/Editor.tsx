import { useState } from "react";
import type { INodeCreate } from "../../api/nodes";
import type { TQuestID } from "../../api/quests";
import Button from "../ui/Button";
import Input from "../ui/Input";
import LinkButton from "../ui/LinkButton";

interface IEditorProps {
  questId: TQuestID;
  handleCreateNode: (
    e: React.SubmitEvent,
    {
      title,
      description,
    }: Omit<INodeCreate, "questId" | "positionX" | "positionY">,
  ) => Promise<void>;
}

const Editor = ({ questId, handleCreateNode }: IEditorProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="flex flex-col flex-1 gap-3 justify-center items-center my-4">
      <h1>Создать узел</h1>
      <form
        onSubmit={(e) => {
          handleCreateNode(e, { title, description });
          setTitle("");
          setDescription("");
        }}
        className="text-center text-xl text-yellow-300 font-pixel"
      >
        <label className="flex flex-col gap-3 ">
          <p>Название</p>
          <Input
            gapX="gap-x-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-3 mt-2.5">
          <p>Описание</p>
          <Input
            gapX="gap-x-0"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <Button type="submit" text="Создать" className="mt-3" />
      </form>

      <LinkButton text="Назад" url={`/quests/${questId}`} />
    </div>
  );
};

export default Editor;
