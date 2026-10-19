import { escapeHtmlAttribute } from "../html";

describe("escapeHtmlAttribute", () => {
  it("should leave ordinary text untouched", () => {
    expect(escapeHtmlAttribute("OpenCourant Logo")).toBe("OpenCourant Logo");
  });

  it("should escape double quotes so the attribute cannot be closed early", () => {
    const result = escapeHtmlAttribute('" onerror="alert(1)');
    expect(result).not.toContain('"');
    expect(result).toBe("&quot; onerror=&quot;alert(1)");
  });

  it("should escape every occurrence, not just the first", () => {
    expect(escapeHtmlAttribute('a"b"c')).toBe("a&quot;b&quot;c");
  });

  it("should escape ampersands so the output stays valid XML", () => {
    expect(escapeHtmlAttribute("Rocky & Linux")).toBe("Rocky &amp; Linux");
  });

  it("should escape angle brackets", () => {
    expect(escapeHtmlAttribute("<script>")).toBe("&lt;script&gt;");
  });

  it("should not double-escape the entities it produces", () => {
    expect(escapeHtmlAttribute('Tom & "Jerry"')).toBe(
      "Tom &amp; &quot;Jerry&quot;"
    );
    expect(escapeHtmlAttribute("&amp;")).toBe("&amp;amp;");
  });

  it("should handle an empty string", () => {
    expect(escapeHtmlAttribute("")).toBe("");
  });
});
