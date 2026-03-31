const DeleteEdge = ({ id, setEdges }) => {
  const deleteEdge = async () => {
    try {
      await fetch(`/api/edges/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      setEdges((prev) => prev.filter((edge) => edge.id !== id));
    } catch {
      throw new Error("Что-то сломалось");
    }
  };

  return (
    <>
      <button
        onClick={() => deleteEdge()}
        className="cursor-pointer p-3 border-2 border-blue-300"
      >
        Delete Node
      </button>
    </>
  );
};

export default DeleteEdge;
