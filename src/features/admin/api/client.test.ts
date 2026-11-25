import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiError, apiRequest } from "./client";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("apiRequest", () => {
  it("returns parsed JSON and sends the bearer token", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: "ok" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(apiRequest<{ data: string }>("/api/test", { token: "admin-token" }))
      .resolves.toEqual({ data: "ok" });
    expect(fetchMock.mock.calls[0][1]?.headers).toMatchObject({
      Authorization: "Bearer admin-token",
      Accept: "application/json",
    });
  });

  it("uses the first field validation error for failed responses", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
      new Response(JSON.stringify({
        error: {
          message: "Invalid request.",
          details: { errors: { email: "Enter a valid email address." } },
        },
      }), { status: 422 }),
    ));

    await expect(apiRequest("/api/test")).rejects.toMatchObject({
      name: "ApiError",
      message: "Enter a valid email address.",
      status: 422,
    });
  });

  it("normalizes network failures", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));

    await expect(apiRequest("/api/test")).rejects.toMatchObject({
      name: "ApiError",
      message: "Cannot reach the API. Make sure it is running and VITE_API_URL is correct.",
      status: 0,
    } satisfies Partial<ApiError>);
  });
});
