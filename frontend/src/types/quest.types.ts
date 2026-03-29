export interface IQuest {
  id: string;
  userId: string;
  startNodeId?: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;

  nodes: INode[];
  edges: IEdge[];
}

export interface INode {
  id: string;
  questId: string;
  title: string;
  description: string;
  positionX: number;
  positionY: number;
  createdAt: string;
  updatedAt: string;

  edgesFrom: IEdge[];
  edgesTo: IEdge[];
}

export interface IEdge {
  id: string;
  questId: string;
  nodeFromId: string;
  nodeToId: string;
  conditions: string;
  createdAt: number;
  updatedAt: number;
}
