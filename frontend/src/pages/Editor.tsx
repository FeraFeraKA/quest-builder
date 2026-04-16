import { useParams } from "react-router";
import NodeList from "../components/layout/NodeList";
import LinkButton from "../components/ui/LinkButton";
import useQuest from "../hooks/quests/useQuest";

const Editor = () => {
  const params = useParams();
  const questId = params.id!;
  const { data: quest, isError, error } = useQuest(questId);

  return (
    <>
      <div className="flex flex-col items-center text-center gap-4 m-3 text-3xl font-pixel text-yellow-300">
        <h1>Это редактор</h1>
        {isError && <p>{error.message}</p>}
        {quest?.nodes.length ? (
          <NodeList nodes={quest.nodes} />
        ) : (
          <p>У тебя нет узлов (событий)</p>
        )}
        <LinkButton
          url="/quests"
          text="Назад к квестам"
          height="h-13"
          textSize="text-xl"
        ></LinkButton>
      </div>
    </>
  );
};

export default Editor;
