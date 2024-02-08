"use client";

// date-fns is a modern JavaScript date utility library
// https://date-fns.org/
import { parseISO, format } from "date-fns";

const Date = ({ dateString }: { dateString: string }) => {
  const date = parseISO(dateString);

  return <time dateTime={dateString}>{format(date, "LLL d, yyyy")}</time>;
  // view different format() string options here:
  // https://date-fns.org/v2.22.1/docs/format
};

export default Date;
