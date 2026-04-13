import { Link } from "react-router";
import Card from "./Card";

interface IQuestProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const Quest = ({
  id,
  title,
  description,
  createdAt,
  updatedAt,
}: IQuestProps) => {
  return (
    <>
      <Link to={`/quests/${id}`}>
        <Card className="cursor-pointer hover:brightness-110 hover:-translate-y-1 active:translate-y-0 transition-all duration-200">
          <h1>{title}</h1>
          <h2>{description}</h2>
          <p>Created at: {createdAt}</p>
          <p>Updated at: {updatedAt}</p>
        </Card>
      </Link>
    </>
  );
};

export default Quest;
