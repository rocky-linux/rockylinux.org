/**
 * Sanitizes and stringifies an object for safe use in JSON-LD script tags.
 * Prevents XSS by escaping characters that could break out of the script context.
 */
export function safeJsonLdStringify(data: Record<string, unknown>): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
