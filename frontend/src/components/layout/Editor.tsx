import type { Edge } from "@xyflow/react";
import { useEffect, useId, useState } from "react";
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

type CreateNodeHandler = (
  e: React.SubmitEvent,
  {
    title,
    description,
  }: Omit<INodeCreate, "questId" | "positionX" | "positionY">,
) => Promise<void>;

type UpdateNodeHandler = (
  e: React.SubmitEvent,
  { nodeId, title, description }: INodeUpdate,
) => Promise<void>;

interface IEditorAction<THandler> {
  run: THandler;
  isPending: boolean;
  isError: boolean;
  error?: string;
}

interface IEditorProps {
  questId: TQuestId;
  selectedNode: QuestNode | null;
  selectedEdge: Edge | null;
  startNodeId: TNodeId;
  createNode: IEditorAction<CreateNodeHandler>;
  updateNode: IEditorAction<UpdateNodeHandler>;
  setStartNode: IEditorAction<() => void>;
  deleteNode: IEditorAction<(nodeId: TNodeId) => void>;
  deleteEdge: IEditorAction<(edgeId: TEdgeId) => void>;
}

const Editor = ({
  questId,
  selectedNode,
  selectedEdge,
  startNodeId,
  setStartNode,
  createNode,
  updateNode,
  deleteNode,
  deleteEdge,
}: IEditorProps) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const titleId = useId();
  const createDescriptionId = useId();
  const updateDescriptionId = useId();

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
      role="region"
      aria-labelledby={titleId}
      className="flex flex-col flex-1 gap-3
      justify-center items-center text-center
      py-4 text-yellow-300 font-pixel
      bg-[url(/images/bg-editor.png)] bg-size-[700px_700px]
      bg-repeat bg-top [image-rendering:pixelated]"
    >
      {selectedEdge ? (
        <div
          className="flex flex-col justify-center items-center"
          aria-busy={deleteEdge.isPending}
        >
          <h1 id={titleId}>{t("editor:edge.title")}</h1>
          <Button
            text={
              deleteEdge.isPending
                ? t("editor:edge.deleting")
                : t("editor:edge.delete")
            }
            onClick={() => deleteEdge.run(selectedEdge.id)}
            disabled={deleteEdge.isPending}
          />
          {deleteEdge.isError ? <p role="alert">{deleteEdge.error}</p> : null}
        </div>
      ) : !selectedNode ? (
        <>
          <h1 id={titleId}>{t("editor:createMode.title")}</h1>
          <form
            onSubmit={(e) => {
              createNode.run(e, { title, description });
              setTitle("");
              setDescription("");
            }}
            className="flex flex-col justify-center items-center"
            aria-labelledby={titleId}
            aria-busy={createNode.isPending}
          >
            <Input
              label={t("common:labels.title")}
              gapX="gap-x-0"
              stacked
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label
              className="flex flex-col gap-0.5 mt-2.5"
              htmlFor={createDescriptionId}
            >
              <span className="text-xl md:text-2xl">
                {t("common:labels.description")}
              </span>
              <Textarea
                id={createDescriptionId}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                onKeyDown={submitFormOnModEnter}
              />
            </label>
            <Button
              type="submit"
              text={
                createNode.isPending
                  ? t("editor:createMode.creating")
                  : t("editor:createMode.create")
              }
              className="mt-3"
              disabled={createNode.isPending}
            />
            {createNode.isError ? <p role="alert">{createNode.error}</p> : null}
          </form>
          <LinkButton text={t("editor:createMode.back")} url={`/quests`} />
          <LinkButton
            text={t("editor:createMode.playtest")}
            url={`/quests/${questId}/playtest`}
          />
        </>
      ) : !selectedEdge ? (
        <>
          <h1 id={titleId}>{t("editor:editMode.title")}</h1>
          <form
            onSubmit={(e) => {
              updateNode.run(e, {
                nodeId: selectedNode.id,
                title: updateTitle,
                description: updateDescription,
              });
            }}
            className="flex flex-col justify-center items-center"
            aria-labelledby={titleId}
            aria-busy={updateNode.isPending}
          >
            <Input
              label={t("common:labels.title")}
              gapX="gap-x-0"
              stacked
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
            <label
              className="flex flex-col gap-0.5 mt-2.5"
              htmlFor={updateDescriptionId}
            >
              <span className="text-xl md:text-2xl">
                {t("common:labels.description")}
              </span>
              <Textarea
                id={updateDescriptionId}
                value={updateDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
                rows={6}
                onKeyDown={submitFormOnModEnter}
              />
            </label>
            <Button
              type="submit"
              text={
                updateNode.isPending
                  ? t("editor:editMode.updating")
                  : t("editor:editMode.update")
              }
              className="mt-3"
              disabled={updateNode.isPending}
            />
            {updateNode.isError ? <p role="alert">{updateNode.error}</p> : null}
          </form>
          <Button
            text={
              setStartNode.isPending
                ? t("editor:editMode.settingAsStart")
                : t("editor:editMode.setAsStart")
            }
            onClick={setStartNode.run}
            disabled={selectedNode.id === startNodeId || setStartNode.isPending}
          />
          {setStartNode.isError ? (
            <p role="alert">{setStartNode.error}</p>
          ) : null}
          <Button
            text={
              deleteNode.isPending
                ? t("editor:node.deleting")
                : t("editor:node.delete")
            }
            onClick={() => deleteNode.run(selectedNode.id)}
            disabled={deleteNode.isPending}
          />
          {deleteNode.isError ? <p role="alert">{deleteNode.error}</p> : null}
        </>
      ) : null}
    </div>
  );
};

export default Editor;
