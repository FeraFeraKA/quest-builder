import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import Button from "../components/ui/Button";
import LinkButton from "../components/ui/LinkButton";
import useQuestTraversal from "../hooks/useQuestTraversal";

const Playtest = () => {
  const { t } = useTranslation("playtest");
  const params = useParams();
  const questId = params.id!;
  const {
    currentNode,
    currentNodeId,
    quest,
    furtherNodes,
    stack,
    handleNextClick,
    handleBackClick,
  } = useQuestTraversal({ questId });

  return (
    <div className="flex flex-col items-center justify-center text-center gap-4">
      <h1>{t("playtest.title")}</h1>
      {currentNode ? <h1>{currentNode.description}</h1> : null}
      {!currentNodeId || !quest ? (
        <h1>{t("play.noStartNode")}</h1>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center mt-2">
          {furtherNodes.map((node) => (
            <Button
              text={node.title}
              key={node.id}
              onClick={(e) => handleNextClick(e, node.id)}
            />
          ))}
          <Button
            text={t("playtest.backStep")}
            onClick={(e) => handleBackClick(e)}
            disabled={stack.length === 0}
          />
        </div>
      )}
      <LinkButton text={t("playtest.exit")} url={`/quests/${questId}/graph`} />
    </div>
  );
};

export default Playtest;
