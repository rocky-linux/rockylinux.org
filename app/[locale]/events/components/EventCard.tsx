import { format, parseISO } from "date-fns";
import {
  CalendarIcon,
  ExternalLinkIcon,
  SewingPinIcon,
} from "@radix-ui/react-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { CommunityEvent } from "@/types/events";

type Props = {
  event: CommunityEvent;
  /** Accessible suffix announced after the link text, e.g. "(opens in a new tab)". */
  externalLinkLabel: string;
  /** Visible text of the event link. */
  visitLabel: string;
  /** Marks a finished event: shows `attendedLabel` and hides the event link. */
  isPast?: boolean;
  /** Visible label for events the project has already attended. */
  attendedLabel: string;
};

/**
 * Formats an event's dates, collapsing the month and year shared by both ends.
 *
 * @param startDate - First day, `YYYY-MM-DD`.
 * @param endDate - Optional last day, `YYYY-MM-DD`.
 * @returns The text for each end of the range and the separator between them.
 */
function formatRange(
  startDate: string,
  endDate?: string
): { start: string; end?: string; separator: string } {
  const start = parseISO(startDate);

  if (!endDate) return { start: format(start, "MMMM d, yyyy"), separator: "" };

  const end = parseISO(endDate);

  if (start.getFullYear() !== end.getFullYear()) {
    return {
      start: format(start, "MMMM d, yyyy"),
      end: format(end, "MMMM d, yyyy"),
      separator: " – ",
    };
  }
  if (start.getMonth() !== end.getMonth()) {
    return {
      start: format(start, "MMMM d"),
      end: format(end, "MMMM d, yyyy"),
      separator: " – ",
    };
  }
  return {
    start: format(start, "MMMM d"),
    end: format(end, "d, yyyy"),
    separator: "–",
  };
}

/**
 * Card describing one community event.
 *
 * @param props - The component props.
 * @param props.event - The event to display.
 * @param props.externalLinkLabel - Accessible suffix for the external link.
 * @param props.visitLabel - Visible text of the event link.
 * @param props.isPast - Whether the event has finished.
 * @param props.attendedLabel - Visible label for finished events.
 * @returns The event card.
 */
const EventCard = ({
  event,
  externalLinkLabel,
  visitLabel,
  isPast = false,
  attendedLabel,
}: Readonly<Props>) => {
  const range = formatRange(event.startDate, event.endDate);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display font-bold">{event.title}</CardTitle>
        <CardDescription className="space-y-1">
          <span className="flex items-center gap-2">
            <CalendarIcon
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            <span>
              <time dateTime={event.startDate}>{range.start}</time>
              {range.end && (
                <>
                  {range.separator}
                  <time dateTime={event.endDate}>{range.end}</time>
                </>
              )}
            </span>
          </span>
          <span className="flex items-center gap-2">
            <SewingPinIcon
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            {event.location}
          </span>
        </CardDescription>
      </CardHeader>
      {(event.description || event.url || isPast) && (
        <CardContent className="space-y-3">
          {event.description && (
            <p className="text-sm leading-6">{event.description}</p>
          )}
          {isPast && <p className="text-sm font-medium">{attendedLabel}</p>}
          {event.url && !isPast && (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary underline"
            >
              {visitLabel}
              <span className="sr-only">{externalLinkLabel}</span>
              <ExternalLinkIcon
                className="h-3 w-3"
                aria-hidden="true"
              />
            </a>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default EventCard;
