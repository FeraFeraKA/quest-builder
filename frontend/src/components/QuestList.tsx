import { useEffect, useState } from "react";
import type { IQuest } from "../types/quest.types";
import Quest from "./Quest";

export const QuestList = () => {
  const [quests, setQuests] = useState<IQuest[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadQuests();
  }, []);

  const loadQuests = async () => {
    try {
      const res = await fetch("/api/quests", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Can't get quests");

      const data = await res.json();

      setQuests(data);
    } catch {
      setError("Не получилось получить квесты");
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        {quests.map((quest) => (
          <Quest
            key={quest.id}
            title={quest.title}
            description={quest.description}
            questId={quest.id}
          />
        ))}
      </div>
      {error && <p>{error}</p>}
    </>
  );
};
