import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import AddQuest from "../components/AddQuest";
import { QuestList } from "../components/QuestList";
import type { IQuest } from "../types/quest.types";

const Dashboard = () => {
  const [error, setError] = useState<string>("");
  const [quests, setQuests] = useState<IQuest[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Login failed");

      navigate("/");
    } catch {
      setError("Неверные данные");
    }
  };

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
      <div className="flex flex-col items-center my-4 gap-4">
        <h1 className="text-3xl">It's your page with quests</h1>
        <AddQuest loadQuests={loadQuests} />
        <QuestList quests={quests} loadQuests={loadQuests} />
        <form
          className="flex items-center gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Link to="/" className="cursor-pointer p-3 border-2 border-blue-300">
            Back to main page
          </Link>
          <button
            type="submit"
            className="cursor-pointer p-3 border-2 border-blue-300"
          >
            Logout
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default Dashboard;
