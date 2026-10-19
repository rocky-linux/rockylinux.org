import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface DownloadRowProps {
  name: string;
  hint?: string;
  /** Text of the action button, e.g. "Download" */
  actionLabel: string;
  /** Opens the link in a new tab when true (external sites) */
  external?: boolean;
  href?: string;
  /** Custom action control, used instead of `href` (e.g. a drawer trigger) */
  action?: ReactNode;
  primary?: boolean;
}

/** One downloadable thing: what it is, why you'd want it, and a button. */
const DownloadRow = ({
  name,
  hint,
  actionLabel,
  external,
  href,
  action,
  primary,
}: DownloadRowProps) => (
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
        className={
          primary
            ? "w-full sm:w-44 sm:shrink-0 bg-green-600 hover:bg-green-700 dark:text-white"
            : "w-full sm:w-44 sm:shrink-0"
        }
      >
        <a
          href={href}
          aria-label={`${actionLabel} ${name}`}
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
