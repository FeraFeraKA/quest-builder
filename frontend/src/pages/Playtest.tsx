import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useId } from "react";
import Button from "../components/ui/Button";
import LinkButton from "../components/ui/LinkButton";
import useQuestTraversal from "../hooks/useQuestTraversal";

const Playtest = () => {
  const { t } = useTranslation();
  const params = useParams();
  const questId = params.id!;
  const titleId = useId();
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
    <div
      className="flex flex-col items-center justify-center text-center gap-4"
      aria-labelledby={titleId}
    >
      <h1 id={titleId}>{t("playtest:playtest.title")}</h1>
      {currentNode ? (
        <h1 aria-live="polite">{currentNode.description}</h1>
      ) : null}

      {!currentNodeId || !quest ? (
        <h1 role="alert">{t("playtest:play.noStartNode")}</h1>
      ) : (
        <div
          role="group"
          aria-label={t("playtest:play.choicesLabel")}
          className="flex flex-col gap-4 items-center justify-center mt-2"
        >
          {furtherNodes.map((node) => (
            <Button
              text={node.title}
              key={node.id}
              onClick={(e) => handleNextClick(e, node.id)}
              aria-label={t("playtest:play.chooseAction", {
                title: node.title,
              })}
            />
          ))}
          <Button
            text={t("playtest:playtest.backStep")}
            onClick={(e) => handleBackClick(e)}
            disabled={stack.length === 0}
            aria-disabled={stack.length === 0}
          />
        </div>
      )}
      <LinkButton
        text={t("playtest:playtest.exit")}
        url={`/quests/${questId}/graph`}
      />
    </div>
  );
};

export default Playtest;
