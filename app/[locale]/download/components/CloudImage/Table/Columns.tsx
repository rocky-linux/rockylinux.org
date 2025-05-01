"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, Column, CellContext } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export type CloudImage = {
  version: string;
  region: string;
  architecture: string;
  imageid: string;
  deploylink: string;
};

const VersionHeader = ({ column }: { column: Column<CloudImage, unknown> }) => {
  const t = useTranslations(
    "download.cards.cloudImages.cloudProviders.aws.table"
  );
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {t("version")}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

const RegionHeader = ({ column }: { column: Column<CloudImage, unknown> }) => {
  const t = useTranslations(
    "download.cards.cloudImages.cloudProviders.aws.table"
  );
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {t("region")}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

const ArchitectureHeader = ({
  column,
}: {
  column: Column<CloudImage, unknown>;
}) => {
  const t = useTranslations(
    "download.cards.cloudImages.cloudProviders.aws.table"
  );
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {t("architecture")}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

const ImageIdHeader = () => {
  const t = useTranslations(
    "download.cards.cloudImages.cloudProviders.aws.table"
  );
  return t("imageId");
};

const DeployHeader = () => {
  const t = useTranslations(
    "download.cards.cloudImages.cloudProviders.aws.table"
  );
  return t("deploy");
};

const DeployCell = ({ cell }: CellContext<CloudImage, unknown>) => {
  const t = useTranslations(
    "download.cards.cloudImages.cloudProviders.aws.table"
  );
  return (
    <Link
      target="_blank"
      href={cell.getValue() as string}
      rel="noopener noreferrer"
    >
      <Button
        variant="default"
        size="sm"
      >
        {t("deploy")}
      </Button>
    </Link>
  );
};

export const Columns: ColumnDef<CloudImage>[] = [
  { accessorKey: "version", header: VersionHeader },
  { accessorKey: "region", header: RegionHeader },
  { accessorKey: "architecture", header: ArchitectureHeader },
  { accessorKey: "imageid", header: ImageIdHeader },
  { accessorKey: "deploylink", header: DeployHeader, cell: DeployCell },
];
