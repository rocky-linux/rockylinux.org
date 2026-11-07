import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { z } from "zod";

import type { CommunityEvent } from "@/types/events";

const eventsDirectory = path.join(process.cwd(), "events");

// gray-matter turns an unquoted YAML date into a Date, so accept both forms
// and normalise to `YYYY-MM-DD`.
const dateSchema = z
  .union([z.string(), z.date()])
  .transform((value) =>
    value instanceof Date
      ? value.toISOString().slice(0, 10)
      : value.trim().slice(0, 10)
  )
  .pipe(z.string().regex(/^\d{4}-\d{2}-\d{2}$/));

const httpUrlSchema = z
  .string()
  .trim()
  .url()
  .refine((value) => /^https?:\/\//i.test(value));

const frontmatterSchema = z.object({
  title: z.string().trim().min(1),
  startDate: dateSchema,
  endDate: dateSchema.optional(),
  location: z.string().trim().min(1),
  url: httpUrlSchema.optional(),
  description: z.string().trim().optional(),
});

/**
 * Parses one event file. Invalid files are skipped with a warning so a single
 * bad entry in the content repo cannot break the page.
 *
 * @param slug - The filename without its `.md` extension.
 * @param fileContents - The raw markdown file contents.
 * @returns The parsed event, or `undefined` when the frontmatter is invalid.
 */
function buildEvent(
  slug: string,
  fileContents: string
): CommunityEvent | undefined {
  const result = frontmatterSchema.safeParse(matter(fileContents).data);

  if (!result.success) {
    console.warn(
      `Ignoring event "${slug}": ${result.error.issues[0].message} (${result.error.issues[0].path.join(".")})`
    );
    return undefined;
  }

  const { endDate, ...rest } = result.data;

  // An end date before the start date is a typo; treat the event as one day.
  return {
    slug,
    ...rest,
    ...(endDate && endDate > rest.startDate ? { endDate } : {}),
  };
}

/**
 * Reads every event from the `events/` directory cloned from the content repo.
 *
 * @returns All valid events, or an empty list when the directory is absent.
 */
async function readAllEvents(): Promise<CommunityEvent[]> {
  let fileNames: string[];

  try {
    fileNames = await fs.promises.readdir(eventsDirectory);
  } catch {
    return [];
  }

  const events = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) =>
        buildEvent(
          fileName.replace(/\.md$/, ""),
          await fs.promises.readFile(
            path.join(eventsDirectory, fileName),
            "utf8"
          )
        )
      )
  );

  return events.filter((event): event is CommunityEvent => event !== undefined);
}

/**
 * Splits events into upcoming and past. An event is upcoming until its last
 * day has ended.
 *
 * @param today - The current date as `YYYY-MM-DD`; defaults to today (UTC).
 * @returns Upcoming events soonest first, and past events most recent first.
 */
export async function getEvents(
  today: string = new Date().toISOString().slice(0, 10)
): Promise<{ upcoming: CommunityEvent[]; past: CommunityEvent[] }> {
  const events = await readAllEvents();
  const lastDay = (event: CommunityEvent) => event.endDate ?? event.startDate;

  return {
    upcoming: events
      .filter((event) => lastDay(event) >= today)
      .sort((a, b) => a.startDate.localeCompare(b.startDate)),
    past: events
      .filter((event) => lastDay(event) < today)
      .sort((a, b) => b.startDate.localeCompare(a.startDate)),
  };
}
