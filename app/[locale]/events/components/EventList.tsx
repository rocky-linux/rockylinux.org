"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import eventsData from "@/data/events.json";
import { cn } from "@/lib/utils";

interface Event {
  title: string;
  location: string;
  date: Date;
  link: string;
}

const events: Event[] = eventsData.map((event) => ({
  ...event,
  date: new Date(`${event.date}T12:00:00Z`),
}));

function CalendarIcon({ date, className }: { date: Date; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-12 h-12 rounded border bg-background",
        className
      )}
    >
      <div className="text-[0.65rem] font-medium text-muted-foreground">
        {date.toLocaleString("default", { month: "short" })}
      </div>
      <div className="font-bold text-xl leading-none">{date.getDate()}</div>
    </div>
  );
}

export default function Component() {
  const [displayCount, setDisplayCount] = useState(10);

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const visibleEvents = sortedEvents.slice(0, displayCount);

  const groupedEvents = visibleEvents.reduce(
    (groups, event) => {
      const monthYear = event.date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(event);
      return groups;
    },
    {} as Record<string, Event[]>
  );

  return (
    <div className="p-4 md:p-6">
      <div className="grid gap-8 w-full max-w-2xl mx-auto">
        {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
          <div
            key={monthYear}
            className="grid gap-4"
          >
            <div className="flex items-center w-full">
              <div className="w-36 font-semibold text-lg text-muted-foreground whitespace-nowrap">
                {monthYear}
              </div>
              <Separator className="flex-1" />
            </div>
            <div className="grid gap-4">
              {monthEvents.map((event, index) => (
                <Link
                  key={index}
                  href={event.link}
                >
                  <Card className="overflow-hidden transition-colors hover:bg-muted/50 group">
                    <CardContent className="p-0">
                      <div className="flex gap-4 p-6 items-center justify-between">
                        <div className="flex gap-4 items-center">
                          <CalendarIcon date={event.date} />
                          <div className="space-y-0.5">
                            <h3 className="font-semibold leading-tight">
                              {event.title}
                            </h3>
                            <span className="text-sm text-muted-foreground">
                              {event.location}
                            </span>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {displayCount < events.length && (
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => setDisplayCount((prev) => prev + 10)}
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}
