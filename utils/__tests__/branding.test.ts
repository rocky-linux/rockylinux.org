import { getActiveBranding } from "../branding";
import type { BrandingSchedule } from "@/types/brandingTypes";

/**
 * Build a Date in local time. getActiveBranding compares recurring events
 * using the local calendar (`now.getMonth()`/`now.getDate()`), so tests must
 * construct dates in local time too. `new Date("2026-06-01")` parses as UTC
 * midnight, which lands on the previous day in timezones behind UTC and makes
 * the boundary assertions fail anywhere other than a UTC machine (e.g. CI).
 */
const localDate = (year: number, month: number, day: number) =>
  new Date(year, month - 1, day);

const prideEvent = {
  name: "Pride Month",
  startDate: "2026-06-01",
  endDate: "2026-06-30",
  icon: "/images/logos/pride.png",
  favicon: "/images/logos/pride_favicon.png",
  tooltip: "The Rocky Linux project recognizes LGBTQ Pride Month.",
  recurring: true,
};

const nonRecurringEvent = {
  name: "Launch Anniversary",
  startDate: "2026-06-21",
  endDate: "2026-06-25",
  icon: "/images/logos/anniversary.png",
  favicon: "/images/logos/anniversary_favicon.png",
  tooltip: "Celebrating the Rocky Linux launch anniversary!",
};

const holidayEvent = {
  name: "Holiday Season",
  startDate: "2026-12-15",
  endDate: "2027-01-05",
  icon: "/images/logos/holiday.png",
  favicon: "/images/logos/holiday_favicon.png",
  tooltip: "Happy holidays from Rocky Linux!",
  recurring: true,
};

describe("getActiveBranding", () => {
  it("should return null for an empty schedule", () => {
    expect(getActiveBranding([], localDate(2026, 6, 15))).toBeNull();
  });

  it("should use the current date when no date is provided", () => {
    expect(getActiveBranding([])).toBeNull();
  });

  describe("recurring events", () => {
    const schedule: BrandingSchedule = [prideEvent];

    it("should match during the active period", () => {
      expect(getActiveBranding(schedule, localDate(2026, 6, 15))).toEqual(
        prideEvent
      );
    });

    it("should match on the start date", () => {
      expect(getActiveBranding(schedule, localDate(2026, 6, 1))).toEqual(
        prideEvent
      );
    });

    it("should match on the end date", () => {
      expect(getActiveBranding(schedule, localDate(2026, 6, 30))).toEqual(
        prideEvent
      );
    });

    it("should not match one day before the start date", () => {
      expect(getActiveBranding(schedule, localDate(2026, 5, 31))).toBeNull();
    });

    it("should not match one day after the end date", () => {
      expect(getActiveBranding(schedule, localDate(2026, 7, 1))).toBeNull();
    });

    it("should match the same month-day in a different year", () => {
      expect(getActiveBranding(schedule, localDate(2030, 6, 15))).toEqual(
        prideEvent
      );
    });
  });

  describe("non-recurring events", () => {
    const schedule: BrandingSchedule = [nonRecurringEvent];

    it("should match during the active period", () => {
      expect(getActiveBranding(schedule, localDate(2026, 6, 23))).toEqual(
        nonRecurringEvent
      );
    });

    it("should not match the same dates in a different year", () => {
      expect(getActiveBranding(schedule, localDate(2027, 6, 23))).toBeNull();
    });
  });

  describe("year-wrapping recurring events", () => {
    const schedule: BrandingSchedule = [holidayEvent];

    it("should match in December within the range", () => {
      expect(getActiveBranding(schedule, localDate(2026, 12, 25))).toEqual(
        holidayEvent
      );
    });

    it("should match in January within the range", () => {
      expect(getActiveBranding(schedule, localDate(2027, 1, 3))).toEqual(
        holidayEvent
      );
    });

    it("should not match before the range in December", () => {
      expect(getActiveBranding(schedule, localDate(2026, 12, 14))).toBeNull();
    });

    it("should not match after the range in January", () => {
      expect(getActiveBranding(schedule, localDate(2027, 1, 6))).toBeNull();
    });

    it("should not match in a month outside the range", () => {
      expect(getActiveBranding(schedule, localDate(2026, 7, 15))).toBeNull();
    });
  });

  describe("priority ordering", () => {
    it("should return the first matching event when events overlap", () => {
      const schedule: BrandingSchedule = [prideEvent, nonRecurringEvent];
      expect(getActiveBranding(schedule, localDate(2026, 6, 23))).toEqual(
        prideEvent
      );
    });
  });
});
