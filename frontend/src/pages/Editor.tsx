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
      <div
        className="absolute inset-0 -z-50 h-screen
        bg-[url(/images/bg.png)] bg-repeat bg-top [image-rendering:pixelated]"
      ></div>
      <div className="flex flex-col items-center gap-4 m-3 text-3xl font-pixel text-yellow-300">
        <h1>It's editor!</h1>
        {isError && <p>{error.message}</p>}
        {quest?.nodes ? (
          <NodeList nodes={quest.nodes} />
        ) : (
          <p>There is no nodes</p>
        )}
        <LinkButton
          url="/quests"
          text="Back to quests"
          height="h-13"
          textSize="text-xl"
        ></LinkButton>
      </div>
    </>
  );
};

export default Editor;
