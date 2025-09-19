import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import VersionContent from "./VersionContent";

interface DownloadOption {
  label: string;
  link: string;
}

interface Links {
  name: string;
  link: string;
}

interface TooltipText {
  text: string;
}

interface VersionItem {
  versionName: string;
  versionId: string;
  currentVersion: string;
  plannedEol: string;
  downloadOptions: DownloadOption[];
  links?: Links[];
}

interface DefaultImageCardProps {
  title: string;
  titleTooltip: boolean;
  titleTooltipText?: TooltipText[];
  titleTooltipButtonLabel: string;
  titleTooltipButtonLink: string;
  versions: VersionItem[];
}

const DefaultImageCard: React.FC<DefaultImageCardProps> = ({
  title,
  titleTooltip,
  titleTooltipText,
  titleTooltipButtonLabel,
  titleTooltipButtonLink,
  versions,
}) => {
  // Since we now filter to only one version in TabsClient, we can directly use the first (and only) version
  const version = versions[0];

  if (!version) {
    return null; // Don't render if no version is available
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {titleTooltip ? (
            <HoverCard>
              <div className="flex gap-2 items-center">
                <span className="text-xl sm:text-2xl font-display font-bold">
                  {title}
                </span>
                <HoverCardTrigger className="text-muted-foreground">
                  <QuestionMarkCircledIcon />
                </HoverCardTrigger>
              </div>
              <HoverCardContent>
                {titleTooltipText?.map((line, index) => (
                  <p
                    key={index}
                    className="font-normal font-sans py-2"
                  >
                    {line.text}
                  </p>
                ))}
                <a href={titleTooltipButtonLink}>
                  <Button className="mt-2">{titleTooltipButtonLabel}</Button>
                </a>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <span className="text-xl sm:text-2xl font-display font-bold">
              {title}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <VersionContent
          currentVersion={version.currentVersion}
          plannedEol={version.plannedEol}
          downloadOptions={version.downloadOptions}
          links={version.links}
        />
      </CardContent>
    </Card>
  );
};

export default DefaultImageCard;
