import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import RouteErrorPage from "./RouteErrorPage";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...actual,
    useRouteError: () => new Error("private diagnostic details"),
  };
});

describe("RouteErrorPage", () => {
  it("shows a friendly message without exposing technical details", () => {
    const html = renderToString(
      <MemoryRouter>
        <RouteErrorPage />
      </MemoryRouter>,
    );

    expect(html).toContain("We couldn&#x27;t load this page");
    expect(html).toContain("Try again");
    expect(html).not.toContain("private diagnostic details");
  });
});
