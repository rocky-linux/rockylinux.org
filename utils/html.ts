/**
 * Escapes a value for a double-quoted HTML/XML attribute.
 * `&` goes first so the entities below are not double-escaped.
 */
export function escapeHtmlAttribute(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
