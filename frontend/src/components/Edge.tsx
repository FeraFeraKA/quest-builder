const Edge = ({ id, nodeFromId, nodeToId, deleteEdge }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center border-2 border-blue-300">
        <h1>nodeFromId: {nodeFromId}</h1>
        <p>nodeToId: {nodeToId}</p>
        <button
          onClick={(e) => deleteEdge(e, id)}
          className="cursor-pointer p-3 border-2 border-blue-300"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default Edge;
