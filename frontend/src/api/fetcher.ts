import { ApiError } from "../helpers/apiError";

interface IFetcherOptions {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  skipRefresh?: boolean;
  notifyOnAuthExpired?: boolean;
}

const API_URL = "/api";
const NETWORK_ERROR_MESSAGE = "Network error. Please check your connection.";
const UNKNOWN_ERROR_MESSAGE = "Something went wrong.";

let authExpiredHandler: (() => void) | null = null;

type TApiErrorBody = {
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
  code?: string;
  message?: string;
};

export const setAuthExpiredHandler = (handler: (() => void) | null) => {
  authExpiredHandler = handler;
};

const toApiUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (normalizedPath.startsWith(`${API_URL}/`)) return normalizedPath;
  return `${API_URL}${normalizedPath}`;
};

const isJsonResponse = (res: Response) =>
  res.headers.get("Content-Type")?.includes("application/json") ?? false;

const readResponseBody = async (res: Response) => {
  if (res.status === 204 || res.status === 205) return null;

  try {
    if (isJsonResponse(res)) {
      return (await res.json()) as unknown;
    }

    const text = await res.text();
    return text || null;
  } catch {
    return null;
  }
};

const toApiError = (res: Response, body: unknown) => {
  if (typeof body === "object" && body !== null) {
    const data = body as TApiErrorBody;
    const error = data.error;

    return new ApiError(
      error?.message ?? data.message ?? res.statusText ?? UNKNOWN_ERROR_MESSAGE,
      res.status,
      error?.code ?? data.code ?? "HTTP_ERROR",
      error?.details,
    );
  }

  return new ApiError(
    typeof body === "string" ? body : res.statusText || UNKNOWN_ERROR_MESSAGE,
    res.status,
    "HTTP_ERROR",
  );
};

const toNetworkError = () =>
  new ApiError(NETWORK_ERROR_MESSAGE, 0, "NETWORK_ERROR");

const refreshToken = async () => {
  try {
    const res = await fetch(toApiUrl("/auth/refresh"), {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) return true;
    if (res.status === 401) return false;

    throw toApiError(res, await readResponseBody(res));
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw toNetworkError();
  }
};

export const fetcher = async <T>({
  url,
  method,
  body,
  skipRefresh = false,
  notifyOnAuthExpired = true,
}: IFetcherOptions): Promise<T> => {
  const requestUrl = toApiUrl(url);

  const makeRequest = () =>
    fetch(requestUrl, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

  try {
    let res = await makeRequest();

    if (!res.ok && res.status === 401 && !skipRefresh) {
      const refreshed = await refreshToken();

      if (refreshed) {
        res = await makeRequest();
      } else {
        if (notifyOnAuthExpired) {
          authExpiredHandler?.();
        }
        throw new ApiError("Unauthorized", 401, "UNAUTHORIZED");
      }
    }

    if (!res.ok) {
      throw toApiError(res, await readResponseBody(res));
    }

    if (res.status === 204 || res.status === 205) {
      return undefined as T;
    }

    if (!isJsonResponse(res)) {
      const text = await res.text();
      return (text || undefined) as T;
    }

    try {
      return (await res.json()) as T;
    } catch {
      throw new ApiError(
        "Invalid server response.",
        res.status,
        "INVALID_RESPONSE",
      );
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw toNetworkError();
  }
};
