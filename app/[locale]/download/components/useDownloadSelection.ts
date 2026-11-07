import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import type {
  PlatformId,
  ProcessedArchitectures,
  Release,
} from "@/types/downloads";
import {
  availableArchs,
  availablePlatforms,
  listReleases,
  resolveArch,
  resolvePlatform,
} from "@/utils/downloadSelection";

interface RawSelection {
  version: string | null;
  platform: string | null;
  arch: string | null;
}

const fromParams = (params: URLSearchParams): RawSelection => ({
  version: params.get("version"),
  platform: params.get("platform"),
  arch: params.get("arch"),
});

export interface DownloadSelection {
  releases: Release[];
  release: Release | undefined;
  platforms: PlatformId[];
  platform: PlatformId;
  archs: string[];
  arch: string | undefined;
  selectRelease: (versionId: string) => void;
  selectPlatform: (platform: PlatformId) => void;
  selectArch: (arch: string) => void;
}

/**
 * The release, platform and architecture on screen, kept in the URL
 * (?version=&platform=&arch=) so any result can be linked to directly.
 *
 * Requested values the data cannot satisfy fall back to something else (see
 * `resolvePlatform` and `resolveArch`). The URL is rewritten to the values
 * that are actually shown, on load and on every change, so a stale value never
 * lingers and a shared link opens what was on screen. History entries are
 * replaced, never added.
 *
 * @param architectures - Processed downloads for every architecture.
 * @returns What is selected, what can be chosen, and the setters.
 */
export function useDownloadSelection(
  architectures: ProcessedArchitectures
): DownloadSelection {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [requested, setRequested] = useState<RawSelection>(() =>
    fromParams(searchParams)
  );
  const [prevQuery, setPrevQuery] = useState(searchParams.toString());

  // Re-sync when the URL changes from outside (browser back/forward)
  if (searchParams.toString() !== prevQuery) {
    setPrevQuery(searchParams.toString());
    setRequested(fromParams(searchParams));
  }

  const resolve = (raw: RawSelection) => {
    const releases = listReleases(architectures);
    const release =
      releases.find((r) => r.versionId === raw.version) ?? releases[0];
    const platforms = release
      ? availablePlatforms(architectures, release.versionId)
      : [];
    const platform = resolvePlatform(platforms, raw.platform);
    const archs = release
      ? availableArchs(architectures, release.versionId, platform)
      : [];
    const arch = resolveArch(archs, raw.arch);
    return { releases, release, platforms, platform, archs, arch };
  };

  const current = resolve(requested);
  const shown: RawSelection = {
    version: current.release?.versionId ?? null,
    platform: current.platform,
    arch: current.arch ?? null,
  };

  // Writes the selection to the URL. Always replaceState: every control is a
  // radio group or tab list, so arrow keys fire a change per keypress and
  // pushState would make Back step through each one.
  const writeUrl = (selection: RawSelection) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(selection)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    // Shallow update: no server round-trip
    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  };

  // Merge the change over what is on screen, not the raw request, so a value
  // the page already replaced can't come back later
  const update = (patch: Partial<RawSelection>) => {
    const next = resolve({ ...shown, ...patch });
    const resolved: RawSelection = {
      version: next.release?.versionId ?? null,
      platform: next.platform,
      arch: next.arch ?? null,
    };
    setRequested(resolved);
    writeUrl(resolved);
  };

  // A link carrying values the page can't show (a platform the release lacks,
  // an unknown release) is rewritten to what is shown. A bare /download is
  // left alone.
  useEffect(() => {
    const hasParams = ["version", "platform", "arch"].some((key) =>
      searchParams.has(key)
    );
    const stale = (Object.keys(shown) as (keyof RawSelection)[]).some(
      (key) => searchParams.has(key) && searchParams.get(key) !== shown[key]
    );
    if (hasParams && stale) writeUrl(shown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, shown.version, shown.platform, shown.arch]);

  return {
    ...current,
    selectRelease: (version) => update({ version }),
    selectPlatform: (platform) => update({ platform }),
    selectArch: (arch) => update({ arch }),
  };
}
