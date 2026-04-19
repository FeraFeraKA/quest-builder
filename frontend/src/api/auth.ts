import { fetcher } from "./fetcher";

interface IFetchUser {
  nickname: string;
  password: string;
}

export const registerUser = async (data: IFetchUser) => {
  const user = await fetcher({
    url: "/auth/register",
    method: "POST",
    body: data,
  });

  return user;
};

export const loginUser = async (data: IFetchUser) => {
  const user = await fetcher({
    url: "/auth/login",
    method: "POST",
    body: data,
  });

  return user;
};

export const logoutUser = async () => {
  const user = await fetcher({
    url: "/auth/logout",
    method: "POST",
  });

  return user;
};

export const getMe = async () => {
  const me = await fetcher({
    url: "/auth/me",
    method: "GET",
  });

  return me;
};
