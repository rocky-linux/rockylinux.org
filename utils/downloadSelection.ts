import type {
  ProcessedArchitectures,
  ProcessedVersion,
} from "@/utils/downloadDataProcessor";

/** Where the user intends to run Rocky Linux. */
export type PlatformId =
  | "install"
  | "cloud"
  | "containers"
  | "desktop"
  | "wsl"
  | "devices";

export type GroupKey = Exclude<
  keyof ProcessedVersion,
  "versionName" | "versionId" | "currentVersion" | "plannedEol"
>;

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

export interface Release {
  versionId: string;
  versionName: string;
  currentVersion: string;
  plannedEol: string;
}

export interface ResolvedGroup {
  key: GroupKey;
  downloadOptions: { label: string; link: string }[];
  links: { name: string; link: string }[];
}

const majorOf = (versionId: string) =>
  Number.parseInt(/\d+/.exec(versionId)?.[0] ?? "0", 10);

/** Major version number for a version id, e.g. "rocky-10" -> "10". */
export const majorVersion = (versionId: string) => String(majorOf(versionId));

/** Every release offered on any architecture, newest first. */
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
  return [...releases.values()].sort(
    (a, b) => majorOf(b.versionId) - majorOf(a.versionId)
  );
}

/** Non-empty download groups for a platform on one architecture and release. */
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

/** Architectures that have something to download for this selection. */
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

export const isPlatformId = (value: string | null): value is PlatformId =>
  PLATFORMS.some((p) => p.id === value);
