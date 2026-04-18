import { useState } from "react";
import type { INodeCreate, TNodeId } from "../../api/nodes";
import type { TQuestId } from "../../api/quests";
import Button from "../ui/Button";
import Input from "../ui/Input";
import LinkButton from "../ui/LinkButton";

interface IEditorProps {
  questId: TQuestId;
  selectedNodeId: TNodeId;
  startNodeId: TNodeId;
  handleCreateNode: (
    e: React.SubmitEvent,
    {
      title,
      description,
    }: Omit<INodeCreate, "questId" | "positionX" | "positionY">,
  ) => Promise<void>;
  handleSetStartNode: () => void;
}

const Editor = ({
  questId,
  selectedNodeId,
  startNodeId,
  handleCreateNode,
  handleSetStartNode,
}: IEditorProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  return (
    <div className="flex flex-col flex-1 gap-3 justify-center items-center text-center my-4 text-yellow-300 font-pixel">
      {!selectedNodeId ? (
        <>
          <h1>Создать узел</h1>
          <form
            onSubmit={(e) => {
              handleCreateNode(e, { title, description });
              setTitle("");
              setDescription("");
            }}
            className="flex flex-col justify-center items-center text-xl "
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
          <LinkButton
            text="Тестировать"
            url={`/quests/${questId}/playtest`}
          />{" "}
        </>
      ) : (
        <>
          <h1>Редактировать узел</h1>
          <form
            onSubmit={(e) => {
              handleCreateNode(e, { title, description });
              setTitle("");
              setDescription("");
            }}
            className="flex flex-col justify-center items-center text-xl "
          >
            <label className="flex flex-col gap-3 ">
              <p>Название</p>
              <Input
                gapX="gap-x-0"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-3 mt-2.5">
              <p>Описание</p>
              <Input
                gapX="gap-x-0"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </label>
            <Button type="submit" text="Обновить" className="mt-3" />
          </form>
          <Button
            text="Задать стартовым"
            onClick={handleSetStartNode}
            disabled={selectedNodeId === startNodeId}
          />
        </>
      )}
    </div>
  );
};

export default Editor;
