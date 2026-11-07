import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface DownloadRowProps {
  name: string;
  hint?: string;
  /** Text of the action button, e.g. "Download" */
  actionLabel: string;
  /** Accessible name of the action button, e.g. "Download DVD ISO" */
  actionAriaLabel?: string;
  /** Opens the link in a new tab when true (external sites) */
  external?: boolean;
  href?: string;
  /** Custom action control, used instead of `href` (e.g. a drawer trigger) */
  action?: ReactNode;
  primary?: boolean;
}

/**
 * One downloadable thing: what it is, why you'd want it, and a button.
 *
 * @param props - Component props.
 * @param props.name - What the file is called.
 * @param props.hint - Plain-language explanation of when to pick it.
 * @param props.actionLabel - Text of the action button, e.g. "Download".
 * @param props.actionAriaLabel - Accessible name of the action button.
 * @param props.external - Opens the link in a new tab when true.
 * @param props.href - Where the button leads.
 * @param props.action - Custom control used instead of `href`, e.g. a drawer trigger.
 * @param props.primary - Styles the button as the main action.
 * @returns A list item with the description and its button.
 */
const DownloadRow = ({
  name,
  hint,
  actionLabel,
  actionAriaLabel,
  external,
  href,
  action,
  primary,
}: Readonly<DownloadRowProps>) => (
  <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
    <div className="min-w-0">
      <p className="font-semibold">{name}</p>
      {hint ? (
        <p className="mt-0.5 text-sm text-muted-foreground">{hint}</p>
      ) : null}
    </div>
    {action ?? (
      <Button
        asChild
        variant={primary ? "default" : "outline"}
        className="w-full sm:w-44 sm:shrink-0"
      >
        <a
          href={href}
          aria-label={actionAriaLabel}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {actionLabel}
        </a>
      </Button>
    )}
  </li>
);

export default DownloadRow;
