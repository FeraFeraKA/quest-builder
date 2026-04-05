interface IFetcherOptions {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
}

export const fetcher = async <T>({
  url,
  method,
  body,
}: IFetcherOptions): Promise<T> => {
  const res = await fetch(url, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "applicastion/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error.message);
  }

  return res.json();
};
