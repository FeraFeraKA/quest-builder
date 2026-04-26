import type { Edge } from "@xyflow/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { TEdgeId } from "../../api/edges";
import type { INodeCreate, INodeUpdate, TNodeId } from "../../api/nodes";
import type { TQuestId } from "../../api/quests";
import { submitFormOnModEnter } from "../../helpers/submitTextarea";
import Button from "../ui/Button";
import type { QuestNode } from "../ui/CustomNode";
import Input from "../ui/Input";
import LinkButton from "../ui/LinkButton";
import Textarea from "../ui/Textarea";

interface IEditorProps {
  questId: TQuestId;
  selectedNode: QuestNode | null;
  selectedEdge: Edge | null;
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
  handleNodeDelete: (nodeId: TNodeId) => void;
  handleEdgeDelete: (edgeId: TEdgeId) => void;
}

const Editor = ({
  questId,
  selectedNode,
  selectedEdge,
  startNodeId,
  handleCreateNode,
  handleUpdateNode,
  handleSetStartNode,
  handleNodeDelete,
  handleEdgeDelete,
}: IEditorProps) => {
  const { t } = useTranslation(["editor", "common"]);
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
    <div
      className="flex flex-col flex-1 gap-3
     justify-center items-center text-center
      py-4 text-yellow-300 font-pixel
      bg-[url(/images/bg-editor.png)] bg-size-[700px_700px]
      bg-repeat bg-top [image-rendering:pixelated]"
    >
      {selectedEdge ? (
        <div className="flex flex-col justify-center items-center">
          <Button
            text={t("edge.delete", { ns: "editor" })}
            onClick={() => handleEdgeDelete(selectedEdge.id)}
          />
        </div>
      ) : !selectedNode ? (
        <>
          <h1>{t("createMode.title", { ns: "editor" })}</h1>
          <form
            onSubmit={(e) => {
              handleCreateNode(e, { title, description });
              setTitle("");
              setDescription("");
            }}
            className="flex flex-col justify-center items-center"
          >
            <label className="flex flex-col gap-3">
              <p className="text-xl md:text-2xl">
                {t("labels.title", { ns: "common" })}
              </p>
              <Input
                gapX="gap-x-0"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-0.5 mt-2.5">
              <p className="text-xl md:text-2xl">
                {t("labels.description", { ns: "common" })}
              </p>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                onKeyDown={submitFormOnModEnter}
              />
            </label>
            <Button
              type="submit"
              text={t("createMode.create", { ns: "editor" })}
              className="mt-3"
            />
          </form>
          <LinkButton
            text={t("createMode.back", { ns: "editor" })}
            url={`/quests`}
          />
          <LinkButton
            text={t("createMode.playtest", { ns: "editor" })}
            url={`/quests/${questId}/playtest`}
          />
        </>
      ) : !selectedEdge ? (
        <>
          <h1>{t("editMode.title", { ns: "editor" })}</h1>
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
              <p>{t("labels.title", { ns: "common" })}</p>
              <Input
                gapX="gap-x-0"
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-3 mt-2.5">
              <p>{t("labels.description", { ns: "common" })}</p>
              <Textarea
                value={updateDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
                rows={6}
                onKeyDown={submitFormOnModEnter}
              />
            </label>
            <Button
              type="submit"
              text={t("editMode.update", { ns: "editor" })}
              className="mt-3"
            />
          </form>
          <Button
            text={t("editMode.setAsStart", { ns: "editor" })}
            onClick={handleSetStartNode}
            disabled={selectedNode.id === startNodeId}
          />
          <Button
            text={t("node.delete")}
            onClick={() => handleNodeDelete(selectedNode.id)}
          />
        </>
      ) : null}
    </div>
  );
};

export default Editor;
