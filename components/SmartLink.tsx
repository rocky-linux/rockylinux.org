import type { ReactNode } from "react";
import type { Route } from "next";
import { Link } from "@/i18n/navigation";

export const LINK_CLASS = "text-primary underline";

const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const IS_HTTP = /^https?:\/\//i;

export type SmartLinkProps = Readonly<{
  href: string;
  children: ReactNode;
  className?: string;
  raw?: boolean;
}>;

/**
 * Renders a link, choosing the right element for where it points.
 *
 * App routes go through the i18n `Link` so the active locale is kept and
 * navigation stays client-side. Off-site URLs get `target` and `rel`. Targets
 * that are same-origin but not routes, such as static files under `public/`,
 * must set `raw` so they bypass the router.
 *
 * @param props - The component props.
 * @param props.href - The link target.
 * @param props.children - The link label.
 * @param props.className - Classes for the rendered element; defaults to the shared link style.
 * @param props.raw - Render a plain anchor instead of routing, for same-origin non-routes.
 * @returns The link element.
 */
const SmartLink = ({
  href,
  children,
  className = LINK_CLASS,
  raw = false,
}: SmartLinkProps) => {
  if (IS_HTTP.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  if (raw || HAS_SCHEME.test(href)) {
    return (
      <a
        href={href}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href as Route}
      className={className}
    >
      {children}
    </Link>
  );
};

/**
 * Builds a `t.rich` chunk renderer for an off-site link.
 *
 * @param href - The absolute URL to link to.
 * @returns A chunk renderer that wraps the chunks in an external link.
 */
export const extLink = (href: string) =>
  function ExtLinkChunk(chunks: ReactNode) {
    return <SmartLink href={href}>{chunks}</SmartLink>;
  };

/**
 * Builds a `t.rich` chunk renderer for a same-origin target that is not a route,
 * such as a static file or a `mailto:` address.
 *
 * @param href - The link target.
 * @returns A chunk renderer that wraps the chunks in a plain anchor.
 */
export const localLink = (href: string) =>
  function LocalLinkChunk(chunks: ReactNode) {
    return (
      <SmartLink
        href={href}
        raw
      >
        {chunks}
      </SmartLink>
    );
  };

/**
 * Builds a `t.rich` chunk renderer for an app route.
 *
 * @param href - The route to link to.
 * @param className - Classes for the link; defaults to the shared link style.
 * @returns A chunk renderer that wraps the chunks in a locale-aware link.
 */
export const routeLink = (href: string, className?: string) =>
  function RouteLinkChunk(chunks: ReactNode) {
    return (
      <SmartLink
        href={href}
        className={className}
      >
        {chunks}
      </SmartLink>
    );
  };

export default SmartLink;
