import { useTranslations } from "next-intl";
import { CheckCircledIcon, TimerIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import releaseData from "@/data/release-tracker.json";

const STAGES = [
  "upstream",
  "building",
  "testing",
  "syncing",
  "released",
] as const;

type Stage = (typeof STAGES)[number];

interface Release {
  version: string;
  currentStage: Stage;
  comment?: string;
  stageLinks?: Partial<Record<Stage, string>>;
}

/**
 * Renders a comment string that supports markdown-style links.
 * e.g. "Join [#testing](https://chat.rockylinux.org) to help" renders the
 * link portion as an anchor tag while keeping surrounding text as-is.
 */
function ReleaseComment({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return (
    <p className="text-sm text-muted-foreground mt-3 text-center">
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
          return (
            <a
              key={i}
              href={match[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              {match[1]}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

function getStageIndex(stage: Stage): number {
  return STAGES.indexOf(stage);
}

const ReleaseTracker = () => {
  const t = useTranslations("home.releaseTracker");

  const releases = releaseData as Release[];

  return (
    <section
      aria-labelledby="release-tracker-title"
      className="py-12 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-2 lg:px-0">
        <div className="lg:text-center">
          <h2
            id="release-tracker-title"
            className="text-3xl font-bold font-display tracking-tight sm:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="mt-2 text-lg leading-8">{t("description")}</p>
        </div>
        <div className="pt-10 sm:pt-16 space-y-4">
          {releases.map((release) => {
            const currentIndex = getStageIndex(release.currentStage);
            const isReleased = release.currentStage === "released";

            return (
              <Card key={release.version}>
                <CardContent className="pt-6">
                  <div
                    role="progressbar"
                    aria-label={`Rocky Linux ${release.version}`}
                    aria-valuenow={currentIndex + 1}
                    aria-valuemin={1}
                    aria-valuemax={STAGES.length}
                  >
                    {/* Mobile layout */}
                    <div className="sm:hidden">
                      <div className="flex items-center justify-between mb-3">
                        <span className="flex items-center gap-1.5 text-lg font-display font-bold">
                          {release.version}
                          {isReleased ? (
                            <CheckCircledIcon className="h-4 w-4 text-primary" />
                          ) : (
                            <TimerIcon className="h-4 w-4 text-muted-foreground animate-spin-slow" />
                          )}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                          {t(`stages.${release.currentStage}`)}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {STAGES.map((stage, index) => {
                          const isCompleted = index < currentIndex;
                          const isCurrent =
                            index === currentIndex && !isReleased;
                          const isReleasedStage = isReleased;

                          return (
                            <div
                              key={stage}
                              className={`h-2 flex-1 rounded-full transition-all ${
                                isCompleted || isReleasedStage
                                  ? "bg-primary"
                                  : isCurrent
                                    ? "bg-primary animate-pulse"
                                    : "bg-muted"
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden sm:block">
                      <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 text-xl font-display font-bold min-w-[5.5rem]">
                          {release.version}
                          {isReleased ? (
                            <CheckCircledIcon className="h-5 w-5 text-primary" />
                          ) : (
                            <TimerIcon className="h-5 w-5 text-muted-foreground animate-spin-slow" />
                          )}
                        </span>
                        <div className="flex-1">
                          <div className="flex gap-1">
                            {STAGES.map((stage, index) => {
                              const isCompleted = index < currentIndex;
                              const isCurrent =
                                index === currentIndex && !isReleased;
                              const isReleasedStage = isReleased;

                              return (
                                <div
                                  key={stage}
                                  className="flex-1"
                                >
                                  <div
                                    className={`h-3 rounded-full transition-all ${
                                      index === 0
                                        ? "rounded-l-full"
                                        : index === STAGES.length - 1
                                          ? "rounded-r-full"
                                          : ""
                                    } ${
                                      isCompleted || isReleasedStage
                                        ? "bg-primary"
                                        : isCurrent
                                          ? "bg-primary animate-pulse"
                                          : "bg-muted"
                                    }`}
                                  />
                                  <div className="mt-2 text-center">
                                    {(() => {
                                      const isActive =
                                        isCompleted ||
                                        isCurrent ||
                                        isReleasedStage;
                                      const stageLink =
                                        release.stageLinks?.[stage];
                                      const labelText = t(`stages.${stage}`);
                                      const description = t(
                                        `stageDescriptions.${stage}`
                                      );

                                      const label = stageLink ? (
                                        <a
                                          href={stageLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className={`text-xs font-medium underline hover:no-underline ${
                                            isActive
                                              ? "text-primary"
                                              : "text-muted-foreground"
                                          }`}
                                        >
                                          {labelText}
                                        </a>
                                      ) : (
                                        <span
                                          className={`text-xs font-medium ${
                                            isActive
                                              ? "text-foreground"
                                              : "text-muted-foreground"
                                          }`}
                                        >
                                          {labelText}
                                        </span>
                                      );

                                      return (
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <span className="cursor-help">
                                                {label}
                                              </span>
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-[200px]">
                                              <p className="text-sm">
                                                {description}
                                              </p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      );
                                    })()}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {release.comment && <ReleaseComment text={release.comment} />}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReleaseTracker;
