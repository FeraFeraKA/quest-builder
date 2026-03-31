import DeleteEdge from "./DeleteEdge";

const Edge = ({ id, nodeFromId, nodeToId, setEdges }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center border-2 border-blue-300">
        <h1>nodeFromId: {nodeFromId}</h1>
        <p>nodeToId: {nodeToId}</p>
        <DeleteEdge id={id} setEdges={setEdges} />
      </div>
    </>
  );
};

export default Edge;
