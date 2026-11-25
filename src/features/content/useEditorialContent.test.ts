import { describe, expect, it } from "vitest";
import { parseArticle } from "./useEditorialContent";

describe("parseArticle", () => {
  it("preserves the first heading when the article starts with one", () => {
    const article = parseArticle(
      "## Installation\nInstall the package.",
      "Installation instructions.",
    );

    expect(article.intro).toBe("Installation instructions.");
    expect(article.sections).toEqual([
      { heading: "Installation", paragraphs: ["Install the package."] },
    ]);
  });

  it("extracts an unheaded preamble as the introduction", () => {
    const article = parseArticle(
      "A short introduction.\n## Installation\nInstall the package.",
      "Fallback excerpt.",
    );

    expect(article.intro).toBe("A short introduction.");
    expect(article.sections).toEqual([
      { heading: "Installation", paragraphs: ["Install the package."] },
    ]);
  });
});
