import type {
  GroupKey,
  PlatformId,
  ProcessedArchitectures,
  Release,
  ResolvedGroup,
} from "@/types/downloads";

interface PlatformSpec {
  id: PlatformId;
  groups: { key: GroupKey; archs?: string[] }[];
}

/** Display order is the order of this list. */
export const PLATFORMS: PlatformSpec[] = [
  { id: "install", groups: [{ key: "defaultImages" }] },
  { id: "cloud", groups: [{ key: "cloudImages" }] },
  { id: "containers", groups: [{ key: "containerImages" }] },
  {
    id: "desktop",
    groups: [{ key: "liveImages", archs: ["x86_64", "aarch64"] }],
  },
  {
    id: "wsl",
    groups: [{ key: "wslImages", archs: ["x86_64", "aarch64"] }],
  },
  {
    id: "devices",
    groups: [
      { key: "rpiImages", archs: ["aarch64"] },
      { key: "visionFive2Images", archs: ["riscv64"] },
    ],
  },
];

const majorOf = (versionId: string) =>
  Number.parseInt(/\d+/.exec(versionId)?.[0] ?? "0", 10);

/**
 * Major version number for a version id.
 *
 * @param versionId - Release id, e.g. "rocky-10".
 * @returns The major version as a string, e.g. "10".
 */
export const majorVersion = (versionId: string) => String(majorOf(versionId));

/**
 * Every release with at least one enabled download on some platform, newest
 * first. Releases whose downloads are all disabled are hidden, so retiring a
 * release in downloads.json removes it from the picker.
 *
 * @param arches - Processed downloads for every architecture.
 * @returns The releases to offer.
 */
export function listReleases(arches: ProcessedArchitectures): Release[] {
  const releases = new Map<string, Release>();
  for (const { versions } of Object.values(arches)) {
    for (const v of versions) {
      if (!releases.has(v.versionId)) {
        releases.set(v.versionId, {
          versionId: v.versionId,
          versionName: v.versionName,
          currentVersion: v.currentVersion,
          plannedEol: v.plannedEol,
        });
      }
    }
  }
  return [...releases.values()]
    .filter(({ versionId }) =>
      PLATFORMS.some(
        ({ id }) => availableArchs(arches, versionId, id).length > 0
      )
    )
    .sort((a, b) => majorOf(b.versionId) - majorOf(a.versionId));
}

/**
 * Non-empty download groups for a platform on one architecture and release.
 *
 * @param arches - Processed downloads for every architecture.
 * @param arch - Architecture to look in.
 * @param versionId - Release id.
 * @param platform - Platform the visitor chose.
 * @returns The groups with something to download, in display order.
 */
export function groupsFor(
  arches: ProcessedArchitectures,
  arch: string,
  versionId: string,
  platform: PlatformId
): ResolvedGroup[] {
  const version = arches[arch]?.versions.find((v) => v.versionId === versionId);
  const spec = PLATFORMS.find((p) => p.id === platform);
  if (!version || !spec) return [];

  return spec.groups.flatMap(({ key, archs }) => {
    if (archs && !archs.includes(arch)) return [];
    const { downloadOptions, links } = version[key];
    return downloadOptions.length > 0 ? [{ key, downloadOptions, links }] : [];
  });
}

/**
 * Architectures that have something to download for this selection.
 *
 * @param arches - Processed downloads for every architecture.
 * @param versionId - Release id.
 * @param platform - Platform the visitor chose.
 * @returns The architecture names.
 */
export function availableArchs(
  arches: ProcessedArchitectures,
  versionId: string,
  platform: PlatformId
): string[] {
  return Object.keys(arches).filter(
    (arch) => groupsFor(arches, arch, versionId, platform).length > 0
  );
}

/**
 * Platforms worth showing for a release. Cloud is always offered because the
 * AWS, Google Cloud and Azure marketplace links do not come from downloads.json.
 *
 * @param arches - Processed downloads for every architecture.
 * @param versionId - Release id.
 * @returns The platform ids, in display order.
 */
export function availablePlatforms(
  arches: ProcessedArchitectures,
  versionId: string
): PlatformId[] {
  return PLATFORMS.filter(
    ({ id }) =>
      id === "cloud" || availableArchs(arches, versionId, id).length > 0
  ).map(({ id }) => id);
}

/**
 * Type guard for platform ids.
 *
 * @param value - A value such as a query parameter.
 * @returns True when `value` is one of the known platforms.
 */
export const isPlatformId = (value: string | null): value is PlatformId =>
  PLATFORMS.some((p) => p.id === value);

/**
 * The platform to show: the requested one if this release offers it, else
 * servers (the main audience), else the first available.
 *
 * @param available - Platforms offered for the release.
 * @param requested - Platform asked for, e.g. from the URL.
 * @returns The platform to show.
 */
export function resolvePlatform(
  available: PlatformId[],
  requested: string | null
): PlatformId {
  if (isPlatformId(requested) && available.includes(requested)) {
    return requested;
  }
  return available.includes("install") ? "install" : available[0];
}

/**
 * The architecture to show: the requested one if available, else x86_64.
 * The visitor's browser architecture says nothing about the machine being
 * deployed to, so it is deliberately not used.
 *
 * @param available - Architectures that have downloads for the selection.
 * @param requested - Architecture asked for, e.g. from the URL.
 * @returns The architecture to show, or undefined when none is available.
 */
export function resolveArch(
  available: string[],
  requested: string | null
): string | undefined {
  if (requested && available.includes(requested)) return requested;
  return available.includes("x86_64") ? "x86_64" : available[0];
}
