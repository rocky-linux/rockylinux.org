"use client";

import { useTranslations } from "next-intl";

import type { ProcessedArchitectures } from "@/types/downloads";

import DownloadPanel from "./DownloadPanel";
import NextSteps from "./NextSteps";
import PlatformPicker from "./PlatformPicker";
import ReleasePicker from "./ReleasePicker";
import { useDownloadSelection } from "./useDownloadSelection";

const StepHeading = ({
  id,
  step,
  children,
}: Readonly<{
  id: string;
  step: number;
  children: string;
}>) => (
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
 * the URL; see `useDownloadSelection`.
 *
 * @param props - Component props.
 * @param props.architectures - Processed downloads for every architecture.
 * @returns The wizard, or nothing when no release has downloads.
 */
const DownloadWizard = ({ architectures }: Readonly<DownloadWizardProps>) => {
  const t = useTranslations("download");
  const {
    releases,
    release,
    platforms,
    platform,
    archs,
    arch,
    selectRelease,
    selectPlatform,
    selectArch,
  } = useDownloadSelection(architectures);

  if (!release) return null;

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
          onSelect={selectRelease}
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
          onSelect={selectPlatform}
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
          onArchChange={selectArch}
        />
      </section>

      <NextSteps versionId={release.versionId} />
    </div>
  );
};

export default DownloadWizard;
