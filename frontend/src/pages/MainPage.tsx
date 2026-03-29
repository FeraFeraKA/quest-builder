import { Link } from "react-router";

const MainPage = () => {
  return (
    <>
      <div className="flex flex-col items-center my-4 gap-4">
        <h1 className="text-center text-3xl">Hello! It's main page</h1>
        <div className="my-4">
          <Link
            to="/auth/register"
            className="cursor-pointer m-3 p-3 border-2 border-blue-300"
          >
            Register
          </Link>
          <Link
            to="/auth/login"
            className="cursor-pointer m-3 p-3 border-2 border-blue-300"
          >
            Login
          </Link>
          <Link
            to="/quests"
            className="cursor-pointer m-3 p-3 border-2 border-blue-300"
          >
            Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainPage;
