import dayjs from "dayjs";
import "dayjs/locale/ru";
import { Link } from "react-router";
import Card from "./Card";

interface IQuestProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

dayjs.locale("ru");

const Quest = ({
  id,
  title,
  description,
  createdAt,
  updatedAt,
}: IQuestProps) => {
  const createdAtTime = dayjs(createdAt).format("D MMMM YYYY");
  const updatedAtTime = dayjs(updatedAt).format("D MMMM YYYY");

  return (
    <>
      <Link to={`/quests/${id}`}>
        <Card className="cursor-pointer whitespace-normal wrap-break-word hover:brightness-110 hover:-translate-y-1 active:translate-y-0 transition-all duration-200">
          <h1>{title}</h1>
          <h2>{description}</h2>
          <p>Создан: {createdAtTime}</p>
          <p>Обновлён: {updatedAtTime}</p>
        </Card>
      </Link>
    </>
  );
};

export default Quest;
