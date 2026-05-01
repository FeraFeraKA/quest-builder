import { fetcher } from "./fetcher";

interface IFetchUser {
  nickname: string;
  password: string;
}

interface IGetMeOptions {
  notifyOnAuthExpired?: boolean;
}

export const registerUser = async (data: IFetchUser) => {
  const user = await fetcher({
    url: "/auth/register",
    method: "POST",
    body: data,
    skipRefresh: true,
  });

  return user;
};

export const loginUser = async (data: IFetchUser) => {
  const user = await fetcher({
    url: "/auth/login",
    method: "POST",
    body: data,
    skipRefresh: true,
  });

  return user;
};

export const logoutUser = async () => {
  const user = await fetcher({
    url: "/auth/logout",
    method: "POST",
    skipRefresh: true,
  });

  return user;
};

export const getMe = async ({ notifyOnAuthExpired }: IGetMeOptions = {}) => {
  const me = await fetcher({
    url: "/auth/me",
    method: "GET",
    notifyOnAuthExpired,
  });

  return me;
};
