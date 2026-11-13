/** A community event Rocky Linux attends, parsed from the content repo's `events/` directory. */
export type CommunityEvent = {
  /** Filename without `.md`; unique per event. */
  slug: string;
  title: string;
  /** First day of the event, `YYYY-MM-DD`. */
  startDate: string;
  /** Last day of the event, `YYYY-MM-DD`. Omitted for single-day events. */
  endDate?: string;
  /** Free-form location, e.g. "Atlanta, GA, USA" or "Online". */
  location: string;
  /** Link to the event's own website. */
  url?: string;
  /** Short plain-text summary. */
  description?: string;
};
