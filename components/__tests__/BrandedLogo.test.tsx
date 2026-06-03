import { render } from "test-utils";

import BrandedLogo from "../BrandedLogo";
import { getActiveBranding } from "@/utils/branding";

// Control which branding (if any) is active without depending on the system
// clock or the real schedule.
jest.mock("@/utils/branding", () => ({
  getActiveBranding: jest.fn(),
}));

const mockedGetActiveBranding = getActiveBranding as jest.MockedFunction<
  typeof getActiveBranding
>;

const prideEvent = {
  name: "Pride Month",
  startDate: "2026-06-01",
  endDate: "2026-06-30",
  icon: "/images/logos/pride.png",
  favicon: "/images/logos/pride_favicon.png",
  tooltip: "The Rocky Linux project recognizes LGBTQ Pride Month.",
  recurring: true,
};

const faviconLinks = () =>
  Array.from(
    document.head.querySelectorAll<HTMLLinkElement>("link[rel='icon']")
  ).map((link) => link.getAttribute("href"));

afterEach(() => {
  mockedGetActiveBranding.mockReset();
  // React hoists <link> tags into <head>; clear them between tests.
  document.head
    .querySelectorAll("link[rel='icon']")
    .forEach((link) => link.remove());
});

describe("BrandedLogo", () => {
  describe("when no branding is active", () => {
    beforeEach(() => {
      mockedGetActiveBranding.mockReturnValue(null);
    });

    it("renders the default favicon link", () => {
      render(<BrandedLogo />);
      expect(faviconLinks()).toEqual(["/favicon.png"]);
    });

    it("does not render a branded logo image", () => {
      const { container } = render(<BrandedLogo />);
      expect(container.querySelector("image")).not.toBeInTheDocument();
    });
  });

  describe("when branding is active", () => {
    beforeEach(() => {
      mockedGetActiveBranding.mockReturnValue(prideEvent);
    });

    it("renders the active branding favicon as the only icon link", () => {
      render(<BrandedLogo />);
      expect(faviconLinks()).toEqual([prideEvent.favicon]);
    });

    it("renders the branded logo image", () => {
      const { container } = render(<BrandedLogo />);
      expect(container.querySelector("image")).toHaveAttribute(
        "href",
        prideEvent.icon
      );
    });
  });

  // Regression guard for the client-navigation bug: the favicon must be
  // rendered declaratively (so React reconciles it across navigations), not
  // mutated onto document.head via a side effect. A declarative <link> is
  // present after render with no manual appendChild to the document head.
  it("renders the favicon link without imperatively mutating document.head", () => {
    mockedGetActiveBranding.mockReturnValue(prideEvent);
    const appendChild = jest.spyOn(document.head, "appendChild");
    render(<BrandedLogo />);

    expect(faviconLinks()).toEqual([prideEvent.favicon]);
    // The favicon must not be appended to <head> imperatively (the old bug).
    const iconAppends = appendChild.mock.calls.filter(
      ([node]) =>
        node instanceof HTMLLinkElement && node.getAttribute("rel") === "icon"
    );
    expect(iconAppends).toHaveLength(0);
    appendChild.mockRestore();
  });
});
