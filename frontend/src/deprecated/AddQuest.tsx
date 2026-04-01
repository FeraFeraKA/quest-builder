import { useState } from "react";

const AddQuest = ({ loadQuests }) => {
  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const addQuest = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/quests", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (!res.ok) {
        throw new Error("Что-то сломалось");
      }

      loadQuests();
    } catch {
      setError("Что-то сломалось");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => addQuest(e)}
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
          Add Quest
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default AddQuest;
