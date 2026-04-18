import { useParams } from "react-router";
import NodeList from "../components/layout/NodeList";
import LinkButton from "../components/ui/LinkButton";
import useGetQuest from "../hooks/quests/useGetQuest";

const EditorPage = () => {
  const params = useParams();
  const questId = params.id!;
  const { data: quest, isError, error } = useGetQuest(questId);

  return (
    <>
      <div className="flex flex-col items-center text-center gap-4 m-3 text-3xl font-pixel text-yellow-300">
        <h1>Это редактор</h1>
        <p className="font-pixel text-yellow-300">Твои узлы (события): </p>
        {isError && <p>{error.message}</p>}
        {quest?.nodes.length ? (
          <NodeList nodes={quest.nodes} />
        ) : (
          <p>У тебя нет узлов (событий)</p>
        )}
        <div className="flex gap-4">
          <LinkButton
            url={`/quests/${questId}/graph`}
            text="Перейти к графу"
          ></LinkButton>
          <LinkButton url="/quests" text="Назад к квестам"></LinkButton>
        </div>
      </div>
    </>
  );
};

export default EditorPage;
