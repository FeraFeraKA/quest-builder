import AddEdge from "./AddEdge";
import Edge from "./Edge";

const EdgeList = ({ edges, setEdges, questId }) => {
  return (
    <>
      <AddEdge setEdges={setEdges} questId={questId} />
      <p>Your edges: </p>
      <div className="flex justify-center">
        {edges.map((edge) => (
          <Edge
            key={edge.id}
            id={edge.id}
            nodeFromId={edge.nodeFromId}
            nodeToId={edge.nodeToId}
            setEdges={setEdges}
          />
        ))}
      </div>
    </>
  );
};

export default EdgeList;
