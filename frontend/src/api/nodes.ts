import { fetcher } from "./fetcher";

type TNodeId = string;

export interface INodeUpdate {
  nodeId: TNodeId;
  title?: string;
  description?: string;
  positionX?: number;
  positionY?: number;
}

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
