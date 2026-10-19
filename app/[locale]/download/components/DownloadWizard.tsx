"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import type { ProcessedArchitectures } from "@/utils/downloadDataProcessor";
import {
  availableArchs,
  availablePlatforms,
  isPlatformId,
  listReleases,
  type PlatformId,
} from "@/utils/downloadSelection";

import DownloadPanel from "./DownloadPanel";
import PlatformPicker from "./PlatformPicker";
import ReleasePicker from "./ReleasePicker";

interface Selection {
  version: string | null;
  platform: string | null;
  arch: string | null;
}

const fromParams = (params: URLSearchParams): Selection => ({
  version: params.get("version"),
  platform: params.get("platform"),
  arch: params.get("arch"),
});

const StepHeading = ({
  id,
  step,
  children,
}: {
  id: string;
  step: number;
  children: string;
}) => (
  <h2
    id={id}
    className="mb-4 flex items-center gap-3 font-display text-xl font-bold sm:text-2xl"
  >
    <span
      aria-hidden="true"
      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
    >
      {step}
    </span>
    {children}
  </h2>
);

interface DownloadWizardProps {
  architectures: ProcessedArchitectures;
}

/**
 * Three steps, top to bottom: release, platform, files. The selection lives in
 * the URL (?version=&platform=&arch=) so any result can be linked to directly.
 */
const DownloadWizard = ({ architectures }: DownloadWizardProps) => {
  const t = useTranslations("download");
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [selection, setSelection] = useState<Selection>(() =>
    fromParams(searchParams)
  );
  const [prevQuery, setPrevQuery] = useState(searchParams.toString());

  // Re-sync when the URL changes from outside (browser back/forward)
  if (searchParams.toString() !== prevQuery) {
    setPrevQuery(searchParams.toString());
    setSelection(fromParams(searchParams));
  }

  const update = (patch: Partial<Selection>) => {
    setSelection((current) => ({ ...current, ...patch }));

    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (value) params.set(key, value);
    }
    // Shallow update: no server round-trip
    window.history.pushState(null, "", `${pathname}?${params.toString()}`);
  };

  const releases = listReleases(architectures);
  const release =
    releases.find((r) => r.versionId === selection.version) ?? releases[0];

  if (!release) return null;

  // Server admins are the main audience, so servers are the default platform
  const platforms = availablePlatforms(architectures, release.versionId);
  const platform: PlatformId = isPlatformId(selection.platform)
    ? platforms.includes(selection.platform)
      ? selection.platform
      : platforms[0]
    : platforms.includes("install")
      ? "install"
      : platforms[0];

  // The browser's architecture says nothing about the machine being deployed
  // to, so x86_64 is the default rather than a guess from the user agent.
  const archs = availableArchs(architectures, release.versionId, platform);
  const arch = archs.includes(selection.arch ?? "")
    ? (selection.arch ?? undefined)
    : archs.includes("x86_64")
      ? "x86_64"
      : archs[0];

  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <section aria-labelledby="step-release">
        <StepHeading
          id="step-release"
          step={1}
        >
          {t("steps.release.title")}
        </StepHeading>
        <ReleasePicker
          releases={releases}
          selected={release.versionId}
          onSelect={(version) => update({ version })}
          labelledBy="step-release"
        />
        <p className="mt-3 text-sm text-muted-foreground">
          {t("steps.release.help")}
        </p>
      </section>

      <section aria-labelledby="step-platform">
        <StepHeading
          id="step-platform"
          step={2}
        >
          {t("steps.platform.title")}
        </StepHeading>
        <PlatformPicker
          platforms={platforms}
          selected={platform}
          onSelect={(next) => update({ platform: next })}
          labelledBy="step-platform"
        />
      </section>

      <section aria-labelledby="step-download">
        <StepHeading
          id="step-download"
          step={3}
        >
          {t("steps.download.title")}
        </StepHeading>
        <DownloadPanel
          arches={architectures}
          release={release}
          platform={platform}
          archs={archs}
          arch={arch}
          onArchChange={(next) => update({ arch: next })}
        />
      </section>
    </div>
  );
};

export default DownloadWizard;
