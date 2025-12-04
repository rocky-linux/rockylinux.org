import { safeJsonLdStringify } from "../jsonLd";

describe("safeJsonLdStringify", () => {
  it("should stringify a simple object", () => {
    const data = { name: "Test", value: 123 };
    const result = safeJsonLdStringify(data);
    expect(result).toBe('{"name":"Test","value":123}');
  });

  it("should escape < characters to prevent script injection", () => {
    const data = { title: "<script>alert('xss')</script>" };
    const result = safeJsonLdStringify(data);
    expect(result).not.toContain("<");
    expect(result).toContain("\\u003c");
  });

  it("should escape > characters to prevent script injection", () => {
    const data = { title: "test</script><script>alert('xss')" };
    const result = safeJsonLdStringify(data);
    expect(result).not.toContain(">");
    expect(result).toContain("\\u003e");
  });

  it("should escape & characters to prevent HTML entity issues", () => {
    const data = { title: "Rocky & Linux" };
    const result = safeJsonLdStringify(data);
    expect(result).not.toContain("&");
    expect(result).toContain("\\u0026");
  });

  it("should escape all dangerous characters in complex content", () => {
    const data = {
      title: "<script>alert('xss')</script>",
      description: "Test & verify > safety < concerns",
    };
    const result = safeJsonLdStringify(data);
    expect(result).not.toContain("<");
    expect(result).not.toContain(">");
    expect(result).not.toContain("&");
  });

  it("should handle nested objects", () => {
    const data = {
      "@context": "https://schema.org",
      author: {
        "@type": "Person",
        name: "Test <Author>",
      },
    };
    const result = safeJsonLdStringify(data);
    expect(result).not.toContain("<");
    expect(result).not.toContain(">");
  });

  it("should handle arrays", () => {
    const data = {
      tags: ["<script>", "test & tag", "normal"],
    };
    const result = safeJsonLdStringify(data);
    expect(result).not.toContain("<");
    expect(result).not.toContain("&");
  });

  it("should produce valid JSON when parsed (after unescaping)", () => {
    const data = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: "Test Article",
      datePublished: "2025-01-01",
    };
    const result = safeJsonLdStringify(data);
    // The escaped output should still be valid JSON
    expect(() => JSON.parse(result)).not.toThrow();
  });
});
