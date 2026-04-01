const DeleteQuest = ({ questId, loadQuests }) => {
  const deleteQuest = async () => {
    try {
      await fetch(`/api/quests/${questId}`, {
        method: "DELETE",
        credentials: "include",
      });

      loadQuests();
    } catch {
      throw new Error("Что-то сломалось");
    }
  };

  return (
    <>
      <button
        onClick={() => deleteQuest()}
        className="cursor-pointer p-3 border-2 border-blue-300"
      >
        Delete Quest
      </button>
    </>
  );
};

export default DeleteQuest;
