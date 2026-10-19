/**
 * Escapes a value for safe use inside a double-quoted HTML/XML attribute.
 * `&` is replaced first so the entities below are not double-escaped.
 */
export function escapeHtmlAttribute(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
