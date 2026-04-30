import { afterEach, describe, expect, it, vi } from "vitest";
import { fetcher } from "../api/fetcher";

describe("fetcher", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns response json on successful request", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ id: "1", title: "Quest" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    const data = await fetcher<{ id: string; title: string }>({
      url: "/api/quests/1",
      method: "GET",
    });

    expect(data).toEqual({
      id: "1",
      title: "Quest",
    });
  });
});

it("sends json body and includes credentials", async () => {
  const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
    new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }),
  );

  await fetcher({
    url: "/auth/login",
    method: "POST",
    body: {
      nickname: "kolya",
      password: "12345678",
    },
  });

  expect(fetchMock).toHaveBeenCalledWith("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nickname: "kolya",
      password: "12345678",
    }),
  });
});

it("throws backend error message", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
    new Response(
      JSON.stringify({
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid input",
        },
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    ),
  );

  await expect(
    fetcher({
      url: "/api/auth/register",
      method: "POST",
      body: {},
    }),
  ).rejects.toThrow("Invalid input");
});
