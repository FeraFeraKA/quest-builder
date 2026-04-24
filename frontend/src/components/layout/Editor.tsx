import { useEffect, useState } from "react";
import type { INodeCreate, INodeUpdate, TNodeId } from "../../api/nodes";
import type { TQuestId } from "../../api/quests";
import Button from "../ui/Button";
import type { QuestNode } from "../ui/CustomNode";
import Input from "../ui/Input";
import LinkButton from "../ui/LinkButton";
import Textarea from "../ui/Textarea";

interface IEditorProps {
  questId: TQuestId;
  selectedNode: QuestNode | null;
  startNodeId: TNodeId;
  handleCreateNode: (
    e: React.SubmitEvent,
    {
      title,
      description,
    }: Omit<INodeCreate, "questId" | "positionX" | "positionY">,
  ) => Promise<void>;
  handleUpdateNode: (
    e: React.SubmitEvent,
    { nodeId, title, description }: INodeUpdate,
  ) => Promise<void>;
  handleSetStartNode: () => void;
}

const Editor = ({
  questId,
  selectedNode,
  startNodeId,
  handleCreateNode,
  handleUpdateNode,
  handleSetStartNode,
}: IEditorProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");

  // MVP: sync form state from selected node, later replace with keyed edit form
  useEffect(() => {
    if (!selectedNode) {
      setUpdateTitle("");
      setUpdateDescription("");
      return;
    }

    setUpdateTitle(selectedNode.data.label);
    setUpdateDescription(selectedNode.data.description);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNode?.id]);

  return (
    <div className="flex flex-col flex-1 gap-3 justify-center items-center text-center my-4 text-yellow-300 font-pixel">
      {!selectedNode ? (
        <>
          <h1>Создать узел</h1>
          <form
            onSubmit={(e) => {
              handleCreateNode(e, { title, description });
              setTitle("");
              setDescription("");
            }}
            className="flex flex-col justify-center items-center"
          >
            <label className="flex flex-col gap-3">
              <p className="text-xl md:text-2xl">Название</p>
              <Input
                gapX="gap-x-0"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-0.5 mt-2.5">
              <p className="text-xl md:text-2xl">Описание</p>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
              />
            </label>
            <Button type="submit" text="Создать" className="mt-3" />
          </form>
          <LinkButton text="Назад" url={`/quests/${questId}`} />
          <LinkButton text="Тестировать" url={`/quests/${questId}/playtest`} />
        </>
      ) : (
        <>
          <h1>Редактировать узел</h1>
          <form
            onSubmit={(e) => {
              handleUpdateNode(e, {
                nodeId: selectedNode.id,
                title: updateTitle,
                description: updateDescription,
              });
            }}
            className="flex flex-col justify-center items-center"
          >
            <label className="flex flex-col gap-3">
              <p>Название</p>
              <Input
                gapX="gap-x-0"
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-3 mt-2.5">
              <p>Описание</p>
              <Input
                gapX="gap-x-0"
                value={updateDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
              />
            </label>
            <Button type="submit" text="Обновить" className="mt-3" />
          </form>
          <Button
            text="Задать стартовым"
            onClick={handleSetStartNode}
            disabled={selectedNode.id === startNodeId}
          />
        </>
      )}
    </div>
  );
};

export default Editor;
