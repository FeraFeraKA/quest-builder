import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import type { TQuestId } from "../api/quests";
import QuestList from "../components/layout/QuestList";
import Button from "../components/ui/Button";
import DeleteQuestConfirmModal from "../components/ui/DeleteQuestConfirmModal";
import LinkButton from "../components/ui/LinkButton";
import useLogout from "../hooks/auth/useLogout";
import useDeleteQuest from "../hooks/quests/useDeleteQuest";
import useGetQuests from "../hooks/quests/useGetQuests";
import CreateQuest from "./CreateQuest";
import EditQuest from "./EditQuest";

const Dashboard = () => {
  const { t } = useTranslation();
  const { data: quests, isError, error } = useGetQuests();
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [questId, setQuestId] = useState("");
  const [deleteQuest, setDeleteQuest] = useState<{
    id: TQuestId;
    title: string;
  } | null>(null);
  const logoutMutation = useLogout();
  const deleteQuestMutation = useDeleteQuest(deleteQuest?.id ?? "");
  const titleId = useId();

  const handleCloseCreateModal = () => {
    setCreateIsOpen(false);
  };

  const handleEditModal = (flag: boolean) => {
    setEditIsOpen(flag);
  };

  const handleSetQuestId = (questId: TQuestId) => {
    setQuestId(questId);
  };

  const handleCloseDeleteModal = () => {
    deleteQuestMutation.reset();
    setDeleteQuest(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteQuest) return;

    deleteQuestMutation.mutate(undefined, {
      onSuccess: () => {
        setDeleteQuest(null);
      },
    });
  };

  return (
    <>
      <div
        className="flex flex-col gap-4 font-pixel text-yellow-300"
        aria-labelledby={titleId}
      >
        <h1 id={titleId} className="text-center">
          {t("quests:dashboard.title")}
        </h1>
        <QuestList
          quests={quests}
          label={t("quests:dashboard.questListLabel")}
          emptyMessage={t("quests:dashboard.emptyQuests")}
          handleEditModal={handleEditModal}
          handleSetQuestId={handleSetQuestId}
          handleDeleteQuest={setDeleteQuest}
        />
        <div className="flex flex-col lg:flex-row items-center self-center gap-4">
          <LinkButton text={t("quests:dashboard.home")} url="/" />
          <Button
            text={
              logoutMutation.isPending
                ? t("quests:dashboard.logoutPending")
                : t("quests:dashboard.logoutIdle")
            }
            onClick={() => logoutMutation.mutate(undefined)}
            disabled={logoutMutation.isPending}
          />
          <Button
            text={t("quests:dashboard.createQuest")}
            onClick={() => setCreateIsOpen((prev) => !prev)}
            aria-expanded={createIsOpen}
            aria-haspopup="dialog"
          />
          <LinkButton text={t("quests:dashboard.guide")} url="/guide" />
          {logoutMutation.isError ? (
            <p role="alert">{logoutMutation.error.message}</p>
          ) : null}
        </div>
        {isError && <p role="alert">{error.message}</p>}
      </div>

      {createIsOpen && (
        <CreateQuest handleCloseModal={handleCloseCreateModal} />
      )}
      {editIsOpen && (
        <EditQuest questId={questId} handleEditModal={handleEditModal} />
      )}
      {deleteQuest && (
        <DeleteQuestConfirmModal
          questTitle={deleteQuest.title}
          isPending={deleteQuestMutation.isPending}
          isError={deleteQuestMutation.isError}
          errorMessage={deleteQuestMutation.error?.message}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default Dashboard;
