import { Link } from "react-router";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col items-center my-4 gap-4">
        <h1 className="text-3xl">It's your page with quests</h1>
        <Link to="/" className="cursor-pointer p-3 border-2 border-blue-300">
          Back to main page
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
