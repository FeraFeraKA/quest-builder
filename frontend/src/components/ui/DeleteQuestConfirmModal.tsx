import { useEffect, useId, useRef } from "react";
import { useTranslation } from "react-i18next";
import Button from "./Button";

interface IDeleteQuestConfirmModalProps {
  questTitle: string;
  isPending: boolean;
  isError: boolean;
  errorMessage?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteQuestConfirmModal = ({
  questTitle,
  isPending,
  isError,
  errorMessage,
  onClose,
  onConfirm,
}: IDeleteQuestConfirmModalProps) => {
  const { t } = useTranslation();
  const titleId = useId();
  const descriptionId = useId();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelButtonRef.current?.focus();
  }, []);

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  return (
    <div className="flex flex-col items-center text-center fixed inset-0 z-30">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        aria-busy={isPending}
        className="my-auto z-30 max-w-150 px-4"
        onKeyDown={(e) => {
          if (e.key === "Escape") handleClose();
        }}
      >
        <h1 id={titleId}>{t("quests:deleteQuest.title")}</h1>
        <p id={descriptionId} className="my-4">
          {t("quests:deleteQuest.description", { title: questTitle })}
        </p>

        <div className="flex flex-col items-center justify-center gap-4">
          <Button
            text={
              isPending
                ? t("quests:card.deleting")
                : t("quests:deleteQuest.confirm")
            }
            onClick={onConfirm}
            disabled={isPending}
          />
          <Button
            ref={cancelButtonRef}
            text={t("quests:deleteQuest.cancel")}
            onClick={handleClose}
            disabled={isPending}
          />
        </div>

        {isError ? <p role="alert">{errorMessage}</p> : null}
      </div>
    </div>
  );
};

export default DeleteQuestConfirmModal;
