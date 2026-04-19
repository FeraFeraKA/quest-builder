import { ApiError } from "../helpers/apiError";

interface IFetcherOptions {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
}

const API_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

const toApiUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL}${normalizedPath}`;
};

const refreshToken = async () => {
  const res = await fetch(toApiUrl("/auth/refresh"), {
    method: "POST",
    credentials: "include",
  });

  return res.ok;
};

export const fetcher = async <T>({
  url,
  method,
  body,
}: IFetcherOptions): Promise<T> => {
  const requestUrl = toApiUrl(url);

  const makeRequest = () =>
    fetch(requestUrl, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

  let res = await makeRequest();

  if (!res.ok && res.status === 401) {
    const refreshed = await refreshToken();

    if (refreshed) {
      res = await makeRequest();
    } else {
      throw new ApiError("Unauthorized", 401, "UNAUTHORIZED");
    }
  }

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error.message);
  }

  if (res.status === 204 || res.status === 205) {
    return undefined as T;
  }

  return res.json();
};