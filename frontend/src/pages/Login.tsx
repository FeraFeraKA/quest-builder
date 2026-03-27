import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [error, setError] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname,
          password,
        }),
      });

      if (!res.ok) throw new Error("Login failed");

      navigate("/quests");
    } catch {
      setError("Неверные данные");
    }
  };

  return (
    <>
      <div className="my-4 text-center flex flex-col items-center">
        <h1 className="text-3xl">Login</h1>
        <form
          className="flex flex-col my-4 gap-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label>
            Nickname
            <input
              className="ml-2 border-2"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              className="ml-2 border-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="cursor-pointer p-3 border-2 border-blue-300"
          >
            Register
          </button>
          <Link to="/" className="cursor-pointer p-3 border-2 border-blue-300">
            Back
          </Link>
          {error && <p>{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Login;
