import type { INode } from "../types/quest.types";
import { fetcher } from "./fetcher";
import type { TQuestId } from "./quests";

export type TNodeId = string;

export interface INodeCreate {
  questId: TQuestId;
  title: string;
  description: string;
  positionX: number;
  positionY: number;
}

export interface INodeUpdate {
  nodeId: TNodeId;
  title?: string;
  description?: string;
  positionX?: number;
  positionY?: number;
}

export const createNode = async ({
  questId,
  title,
  description,
  positionX,
  positionY,
}: INodeCreate) => {
  const node = await fetcher<INode>({
    url: `/api/quests/${questId}/nodes`,
    method: "POST",
    body: {
      title,
      description,
      positionX,
      positionY,
    },
  });

  return node;
};

export const updateGraphNode = async ({
  nodeId,
  positionX,
  positionY,
}: INodeUpdate) => {
  const node = await fetcher({
    url: `/api/nodes/${nodeId}`,
    method: "PATCH",
    body: {
      positionX,
      positionY,
    },
  });

  return node;
};

export const updateNode = async ({
  nodeId,
  title,
  description,
}: INodeUpdate) => {
  const node = await fetcher<INode>({
    url: `/api/nodes/${nodeId}`,
    method: "PATCH",
    body: {
      title,
      description,
    },
  });

  return node;
};

export const deleteNode = async (nodeId: TNodeId) => {
  await fetcher({
    url: `/api/nodes/${nodeId}`,
    method: "DELETE",
  });
};
