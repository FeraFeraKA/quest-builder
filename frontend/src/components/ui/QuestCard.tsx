import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import type { TQuestId } from "../../api/quests";
import Button from "./Button";
import Card from "./Card";
import LinkButton from "./LinkButton";

interface IQuestProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  handleEditModal: (flag: boolean) => void;
  handleSetQuestId: (questId: TQuestId) => void;
  handleDeleteQuest: (quest: { id: TQuestId; title: string }) => void;
}

const Quest = ({
  id,
  title,
  description,
  createdAt,
  updatedAt,
  handleEditModal,
  handleSetQuestId,
  handleDeleteQuest,
}: IQuestProps) => {
  const { t, i18n } = useTranslation();
  const titleId = useId();

  const dayjsLocale = i18n.resolvedLanguage?.startsWith("ru") ? "ru" : "en";

  const createdAtTime = dayjs(createdAt)
    .locale(dayjsLocale)
    .format("D MMMM YYYY");

  const updatedAtTime = dayjs(updatedAt)
    .locale(dayjsLocale)
    .format("D MMMM YYYY");

  const handleDeleteClick = () => {
    handleDeleteQuest({ id, title });
  };

  const handleEditClick = () => {
    handleSetQuestId(id);
    handleEditModal(true);
  };

  return (
    <Card
      role="listitem"
      aria-labelledby={titleId}
      className="
        relative whitespace-normal wrap-break-word
        hover:brightness-110 hover:-translate-y-1 active:translate-y-0
        transition-all duration-200
      "
    >
      <Link
        to={`/quests/${id}/graph`}
        aria-label={t("quests:card.openGraph", { title })}
        className="
          absolute inset-0 z-10 cursor-pointer rounded-sm
        "
      />

      <div className="relative z-15 pointer-events-none">
        <h2 id={titleId}>{title}</h2>
        <p>{description}</p>

        <div>
          <p>
            {t("quests:card.createdPrefix")} {createdAtTime}
          </p>

          <p>
            {t("quests:card.updatedPrefix")} {updatedAtTime}
          </p>
        </div>
      </div>

      <div className="relative z-15 pointer-events-auto inline-flex flex-col items-start gap-2">
        <Button
          text={t("quests:card.delete")}
          height="h-10"
          textSize="text-lg"
          className="mt-1"
          onClick={handleDeleteClick}
          aria-label={t("quests:card.deleteQuest", { title })}
          aria-haspopup="dialog"
        />

        <LinkButton
          text={t("quests:card.play")}
          url={`/quests/${id}/play`}
          height="h-10"
          textSize="text-lg"
          aria-label={t("quests:card.playQuest", { title })}
        />

        <Button
          text={t("quests:card.edit")}
          height="h-10"
          textSize="text-lg"
          onClick={handleEditClick}
          aria-label={t("quests:card.editQuest", { title })}
          aria-haspopup="dialog"
        />
      </div>
    </Card>
  );
};

export default Quest;
