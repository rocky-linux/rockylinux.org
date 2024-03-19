import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Tabs } from "@/components/ui/tabs";
import VersionPicker from "./VersionPicker";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

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
  links: Links[];
}

interface DefaultImageCardProps {
  title: string;
  titleTooltip: boolean;
  titleTooltipText?: TooltipText[];
  titleTooltipButtonLabel: string;
  titleTooltipButtonLink: Url;
  versions: VersionItem[];
}

const DefaultImageCard: React.FC<DefaultImageCardProps> = ({
  title,
  titleTooltip,
  titleTooltipText,
  titleTooltipButtonLabel,
  titleTooltipButtonLink,
  versions,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>
        {titleTooltip ? (
          <HoverCard>
            <div className="flex gap-2 items-center">
              <h2 className="text-2xl font-display font-bold">{title}</h2>
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
              <Link href={titleTooltipButtonLink}>
                <Button className="mt-2">{titleTooltipButtonLabel}</Button>
              </Link>
            </HoverCardContent>
          </HoverCard>
        ) : (
          <h2 className="text-2xl font-display font-bold">{title}</h2>
        )}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="rocky-9">
        <VersionPicker versions={versions} />
      </Tabs>
    </CardContent>
  </Card>
);

export default DefaultImageCard;
