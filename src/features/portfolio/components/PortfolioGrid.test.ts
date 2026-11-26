import { describe, expect, it } from "vitest";
import { getCmsProjectCategory } from "../utils/projectCategory";

describe("getCmsProjectCategory", () => {
  it("classifies web applications as web", () => {
    expect(getCmsProjectCategory("Web Application")).toBe("web");
  });

  it("prioritizes SaaS over application wording", () => {
    expect(getCmsProjectCategory("SaaS Application")).toBe("saas");
  });

  it("classifies explicit mobile app types as mobile", () => {
    expect(getCmsProjectCategory("Native Mobile App")).toBe("mobile");
  });
});
