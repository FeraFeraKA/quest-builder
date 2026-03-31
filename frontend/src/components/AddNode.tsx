import { useState } from "react";

const AddNode = ({ setNodes, questId }) => {
  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const addNode = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/quests/${questId}/nodes`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          positionX: 300,
          positionY: 300,
        }),
      });

      if (!res.ok) {
        throw new Error("Что-то сломалось");
      }

      const data = await res.json();

      setNodes((prev) => [...prev, data]);
    } catch {
      setError("Что-то сломалось");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => addNode(e)}
        className="flex flex-col items-center gap-2"
      >
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="ml-2 border-2"
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="ml-2 border-2"
          />
        </label>
        <button
          type="submit"
          className="cursor-pointer p-3 border-2 border-blue-300"
        >
          Add Node
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default AddNode;
