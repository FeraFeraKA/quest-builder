const DeleteNode = ({ id, setNodes }) => {
  const deleteNode = async () => {
    try {
      await fetch(`/api/nodes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      setNodes((prev) => prev.filter((node) => node.id !== id));
    } catch {
      throw new Error("Что-то сломалось");
    }
  };

  return (
    <>
      <button
        onClick={() => deleteNode()}
        className="cursor-pointer p-3 border-2 border-blue-300"
      >
        Delete Node
      </button>
    </>
  );
};

export default DeleteNode;
