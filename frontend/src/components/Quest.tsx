import { Link } from "react-router";
import DeleteQuest from "./DeleteQuest";

const Quest = ({ title, description, questId, loadQuests }) => {
  return (
    <>
      <div className="flex justify-center items-center border-2 border-blue-300 w-70 h-13">
        <h1>{title}</h1>
        <p>{description}</p>
        <Link
          to={`/quests/${questId}`}
          className="ml-2 cursor-pointer p-1 border-2 border-red-300"
        >
          Go to quest
        </Link>
        <DeleteQuest questId={questId} loadQuests={loadQuests} />
      </div>
    </>
  );
};

export default Quest;
