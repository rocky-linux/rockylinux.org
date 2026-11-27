import { render, screen } from "test-utils";

// The i18n Link pulls in next-intl routing, which the global next-intl mock
// does not provide. Stub it so the element choice is what gets asserted.
jest.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a
      href={href}
      data-i18n-link="true"
      {...rest}
    >
      {children}
    </a>
  ),
}));

import SmartLink, {
  LINK_CLASS,
  extLink,
  localLink,
  routeLink,
} from "@/components/SmartLink";

const link = (name: string) => screen.getByRole("link", { name });

describe("SmartLink", () => {
  describe("app routes", () => {
    it("routes through the i18n link so the locale is kept", () => {
      render(<SmartLink href="/about/charter">Charter</SmartLink>);

      const el = link("Charter");
      expect(el).toHaveAttribute("data-i18n-link", "true");
      expect(el).toHaveAttribute("href", "/about/charter");
      expect(el).not.toHaveAttribute("target");
    });
  });

  describe("off-site URLs", () => {
    it("opens in a new tab with a safe rel", () => {
      render(<SmartLink href="https://example.com">Example</SmartLink>);

      const el = link("Example");
      expect(el).not.toHaveAttribute("data-i18n-link");
      expect(el).toHaveAttribute("target", "_blank");
      expect(el).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("treats http the same as https", () => {
      render(<SmartLink href="http://example.com">Insecure</SmartLink>);

      expect(link("Insecure")).toHaveAttribute("target", "_blank");
    });
  });

  describe("same-origin targets that are not routes", () => {
    it("bypasses the router when raw is set", () => {
      render(
        <SmartLink
          href="/security-pgp-key.asc"
          raw
        >
          Key
        </SmartLink>
      );

      const el = link("Key");
      expect(el).not.toHaveAttribute("data-i18n-link");
      expect(el).not.toHaveAttribute("target");
      expect(el).toHaveAttribute("href", "/security-pgp-key.asc");
    });

    it("bypasses the router for non-http schemes", () => {
      render(<SmartLink href="mailto:security@rockylinux.org">Mail</SmartLink>);

      const el = link("Mail");
      expect(el).not.toHaveAttribute("data-i18n-link");
      expect(el).not.toHaveAttribute("target");
    });
  });

  describe("styling", () => {
    it("applies the shared link style by default", () => {
      render(<SmartLink href="/news">News</SmartLink>);

      expect(link("News")).toHaveClass(...LINK_CLASS.split(" "));
    });

    it("accepts a className override", () => {
      render(
        <SmartLink
          href="/news"
          className="custom"
        >
          News
        </SmartLink>
      );

      const el = link("News");
      expect(el).toHaveClass("custom");
      expect(el).not.toHaveClass("underline");
    });
  });
});

describe("chunk renderers", () => {
  it("extLink renders an external link", () => {
    render(<p>{extLink("https://example.com")("Docs")}</p>);

    expect(link("Docs")).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("localLink renders a plain anchor", () => {
    render(<p>{localLink("/.well-known/security.txt")("security.txt")}</p>);

    const el = link("security.txt");
    expect(el).not.toHaveAttribute("data-i18n-link");
    expect(el).not.toHaveAttribute("target");
  });

  it("routeLink renders a locale-aware link", () => {
    render(<p>{routeLink("/news")("News")}</p>);

    expect(link("News")).toHaveAttribute("data-i18n-link", "true");
  });
});
