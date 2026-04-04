import { fetcher } from "./fetcher";

interface IFetchUser {
  nickname: string;
  password: string;
}

export const registerUser = async (data: IFetchUser) => {
  const user = await fetcher({
    url: "/api/auth/register",
    method: "POST",
    body: data,
  });

  return user;
};

export const loginUser = async (data: IFetchUser) => {
  const user = await fetcher({
    url: "/api/auth/login",
    method: "POST",
    body: data,
  });

  return user;
};
