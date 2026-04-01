import { useState } from "react";

const AddEdge = ({ setEdges, questId }) => {
  const [error, setError] = useState<string>("");
  const [nodeFromId, setNodeFromId] = useState<string>("");
  const [nodeToId, setNodeToId] = useState<string>("");

  const addEdge = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/quests/${questId}/edges`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nodeFromId,
          nodeToId,
        }),
      });

      if (!res.ok) {
        throw new Error("Что-то сломалось");
      }

      const data = await res.json();

      setEdges((prev) => [...prev, data]);
    } catch {
      setError("Что-то сломалось");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => addEdge(e)}
        className="flex flex-col items-center gap-2"
      >
        <label>
          Node From Id:
          <input
            type="text"
            value={nodeFromId}
            onChange={(e) => setNodeFromId(e.target.value)}
            className="ml-2 border-2"
          />
        </label>
        <label>
          Node To Id:
          <input
            type="text"
            value={nodeToId}
            onChange={(e) => setNodeToId(e.target.value)}
            className="ml-2 border-2"
          />
        </label>
        <button
          type="submit"
          className="cursor-pointer p-3 border-2 border-blue-300"
        >
          Add Edge
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default AddEdge;
