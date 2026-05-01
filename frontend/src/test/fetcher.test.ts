import { afterEach, describe, expect, it, vi } from "vitest";
import { fetcher, setAuthExpiredHandler } from "../api/fetcher";
import { ApiError } from "../helpers/apiError";

afterEach(() => {
  setAuthExpiredHandler(null);
  vi.restoreAllMocks();
});

describe("fetcher", () => {
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

    const error = await fetcher({
      url: "/api/auth/register",
      method: "POST",
      body: {},
    }).catch((error: unknown) => error);

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({
      message: "Invalid input",
      status: 400,
      code: "VALIDATION_ERROR",
    });
  });

  it("throws ApiError for non-json errors", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response("Gateway timeout", {
        status: 504,
        statusText: "Gateway Timeout",
        headers: {
          "Content-Type": "text/plain",
        },
      }),
    );

    const error = await fetcher({
      url: "/quests",
      method: "GET",
    }).catch((error: unknown) => error);

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({
      message: "Gateway timeout",
      status: 504,
      code: "HTTP_ERROR",
    });
  });

  it("throws ApiError for network errors", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
      new TypeError("Failed"),
    );

    const error = await fetcher({
      url: "/quests",
      method: "GET",
    }).catch((error: unknown) => error);

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({
      status: 0,
      code: "NETWORK_ERROR",
    });
  });

  it("refreshes token once on 401 and retries the original request", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            error: {
              code: "UNAUTHORIZED",
              message: "Unauthorized",
            },
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          },
        ),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ id: "1" }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );

    await expect(
      fetcher({
        url: "/quests/1",
        method: "GET",
      }),
    ).resolves.toEqual({ id: "1" });

    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "/api/auth/refresh",
      expect.objectContaining({ method: "POST" }),
    );
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("does not refresh when skipRefresh is set", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          error: {
            code: "UNAUTHORIZED",
            message: "Invalid credentials",
          },
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    const error = await fetcher({
      url: "/auth/login",
      method: "POST",
      body: {
        nickname: "kolya",
        password: "wrong-password",
      },
      skipRefresh: true,
    }).catch((error: unknown) => error);

    expect(error).toMatchObject({
      status: 401,
      code: "UNAUTHORIZED",
      message: "Invalid credentials",
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("calls auth expired handler when refresh returns 401", async () => {
    const authExpiredHandler = vi.fn();
    setAuthExpiredHandler(authExpiredHandler);

    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            error: {
              code: "UNAUTHORIZED",
              message: "Unauthorized",
            },
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          },
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            error: {
              code: "INVALID_TOKEN",
              message: "Invalid credentials",
            },
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          },
        ),
      );

    const error = await fetcher({
      url: "/quests",
      method: "GET",
    }).catch((error: unknown) => error);

    expect(error).toMatchObject({
      status: 401,
      code: "UNAUTHORIZED",
    });
    expect(authExpiredHandler).toHaveBeenCalledOnce();
  });

  it("does not call auth expired handler when notifyOnAuthExpired is false", async () => {
    const authExpiredHandler = vi.fn();
    setAuthExpiredHandler(authExpiredHandler);

    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            error: {
              code: "UNAUTHORIZED",
              message: "Unauthorized",
            },
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          },
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            error: {
              code: "NO_TOKEN",
              message: "Invalid credentials",
            },
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          },
        ),
      );

    const error = await fetcher({
      url: "/auth/me",
      method: "GET",
      notifyOnAuthExpired: false,
    }).catch((error: unknown) => error);

    expect(error).toMatchObject({
      status: 401,
      code: "UNAUTHORIZED",
    });
    expect(authExpiredHandler).not.toHaveBeenCalled();
  });
});
