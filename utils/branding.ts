import type {
  ScheduledBranding,
  BrandingSchedule,
} from "@/types/brandingTypes";

/**
 * Parse a date string (YYYY-MM-DD) and return month (1-12) and day (1-31).
 */
function parseMonthDay(dateStr: string): { month: number; day: number } {
  const parts = dateStr.split("-");
  return {
    month: parseInt(parts[1], 10),
    day: parseInt(parts[2], 10),
  };
}

/**
 * Check if a month-day pair falls within a recurring range.
 * Handles year-wrapping ranges (e.g., Dec 15 -> Jan 5).
 */
function isInRecurringRange(
  currentMonth: number,
  currentDay: number,
  start: { month: number; day: number },
  end: { month: number; day: number }
): boolean {
  const current = currentMonth * 100 + currentDay;
  const startVal = start.month * 100 + start.day;
  const endVal = end.month * 100 + end.day;

  if (startVal <= endVal) {
    // Normal range (e.g., Jun 1 -> Jun 30)
    return current >= startVal && current <= endVal;
  } else {
    // Year-wrapping range (e.g., Dec 15 -> Jan 5)
    return current >= startVal || current <= endVal;
  }
}

/**
 * Determine if a scheduled branding event is currently active.
 *
 * For recurring events, only the month and day are compared (the year
 * in startDate/endDate is ignored). This handles year-wrapping ranges
 * such as Dec 15 -> Jan 5.
 *
 * For non-recurring events, the full date (including year) is compared.
 */
function isEventActive(event: ScheduledBranding, now: Date): boolean {
  if (event.recurring) {
    const start = parseMonthDay(event.startDate);
    const end = parseMonthDay(event.endDate);
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();
    return isInRecurringRange(currentMonth, currentDay, start, end);
  }

  // Non-recurring: full date comparison
  const startDate = new Date(event.startDate + "T00:00:00");
  const endDate = new Date(event.endDate + "T23:59:59");
  return now >= startDate && now <= endDate;
}

/**
 * Get the currently active branding event from the schedule.
 *
 * Returns the first matching event if the current date falls within its
 * range, or null if no event is active (meaning the default branding
 * should be used).
 *
 * When multiple events overlap, the first match in the array wins,
 * giving maintainers explicit control over priority via ordering.
 */
export function getActiveBranding(
  schedule: BrandingSchedule,
  now: Date = new Date()
): ScheduledBranding | null {
  for (const event of schedule) {
    if (isEventActive(event, now)) {
      return event;
    }
  }
  return null;
}
