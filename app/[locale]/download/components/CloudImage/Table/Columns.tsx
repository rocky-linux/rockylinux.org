/* eslint-disable react/jsx-no-literals */
"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export type CloudImage = {
  version: string;
  region: string;
  architecture: string;
  imageid: string;
  deploylink: string;
};

export const Columns: ColumnDef<CloudImage>[] = [
  {
    accessorKey: "version",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Version
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "region",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Region
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "architecture",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Architecture
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  { accessorKey: "imageid", header: "Image ID" },
  {
    accessorKey: "deploylink",
    header: "Deploy",
    cell: ({ cell }) => {
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
            Deploy
          </Button>
        </Link>
      );
    },
  },
];
