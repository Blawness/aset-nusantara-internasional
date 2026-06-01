import { describe, it, expect } from "vitest";
import { ARTICLES, getArticle, getAllSlugs } from "@/lib/articles";

describe("articles data", () => {
  it("exposes at least two seed articles", () => {
    expect(ARTICLES.length).toBeGreaterThanOrEqual(2);
  });

  it("every article has required fields and non-empty body", () => {
    for (const a of ARTICLES) {
      expect(a.slug).toBeTruthy();
      expect(a.title).toBeTruthy();
      expect(a.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(a.excerpt).toBeTruthy();
      expect(a.body.length).toBeGreaterThan(0);
    }
  });

  it("slugs are unique", () => {
    const slugs = ARTICLES.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("getArticle returns the matching article or undefined", () => {
    const first = ARTICLES[0];
    expect(getArticle(first.slug)?.title).toBe(first.title);
    expect(getArticle("does-not-exist")).toBeUndefined();
  });

  it("getAllSlugs returns every slug", () => {
    expect(getAllSlugs().sort()).toEqual(ARTICLES.map((a) => a.slug).sort());
  });
});
