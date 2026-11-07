export interface DownloadOption {
  label: string;
  link: string;
}

export interface Link {
  name: string;
  link: string;
}

export interface VersionItem {
  versionName: string;
  versionId: string;
  currentVersion: string;
  plannedEol: string;
  downloadOptions: DownloadOption[];
  links: Link[];
}

export interface SpecializedDevice {
  name: string;
  download: UrlEntry;
  checksum: UrlEntry;
  readMe?: UrlEntry;
}

/**
 * A download or link URL. A plain string is enabled. Use the object form only
 * to disable it: `{ "url": "...", "enabled": false }`.
 *
 * `disabled-reason` is a note for people reading downloads.json (JSON has no
 * comments). The app and the URL checker intentionally ignore it.
 */
export type UrlEntry =
  | string
  | { url: string; enabled?: boolean; "disabled-reason"?: string };

export interface DownloadOptions {
  defaultImages: {
    dvd: UrlEntry;
    boot: UrlEntry;
    minimal?: UrlEntry;
  };
  cloudImages?: {
    qcow2: UrlEntry;
  };
  container: {
    fullImage: UrlEntry;
    minimalImage: UrlEntry;
  };
  liveImages?: {
    gnome: UrlEntry;
    gnomeLite: UrlEntry;
    kde?: UrlEntry;
    xfce: UrlEntry;
    mate: UrlEntry;
    cinnamon?: UrlEntry;
  };
  rpiImages?: {
    currentVersion?: string;
    download: UrlEntry;
  };
  wslImages?: {
    currentVersion?: string;
    download: UrlEntry;
  };
  visionfive2Images?: {
    currentVersion?: string;
    download: UrlEntry;
  };
  specializedDevices?: SpecializedDevice[];
}

export interface Links {
  defaultImages: {
    torrent: UrlEntry;
    checksum: UrlEntry;
    baseOs: UrlEntry;
    archived: UrlEntry;
  };
  cloudImages?: {
    checksum: UrlEntry;
  };
  liveImages?: {
    checksums: UrlEntry;
  };
  rpiImages?: {
    currentVersion?: string;
    checksum: UrlEntry;
    readMe: UrlEntry;
  };
  wslImages?: {
    currentVersion?: string;
    checksum: UrlEntry;
    readMe: UrlEntry;
  };
  visionfive2Images?: {
    currentVersion?: string;
    checksum: UrlEntry;
    readMe?: UrlEntry;
  };
  specializedDevices?: {
    name: string;
    checksum: UrlEntry;
    readMe?: UrlEntry;
  }[];
}

export interface Version {
  versionName: string;
  versionId: string;
  currentVersion: string;
  plannedEol: string;
  downloadOptions: DownloadOptions;
  links: Links;
}

export interface Architecture {
  versions: Version[];
}

export interface DownloadData {
  architectures: {
    [key: string]: Architecture;
  };
}

/** A download button. `id` is stable across locales; `label` is translated. */
export interface ProcessedOption {
  id: string;
  label: string;
  link: string;
}

export interface ProcessedLink {
  name: string;
  link: string;
}

export interface ProcessedGroup {
  downloadOptions: ProcessedOption[];
  links: ProcessedLink[];
}

export interface ProcessedVersion {
  versionName: string;
  versionId: string;
  currentVersion: string;
  plannedEol: string;
  defaultImages: ProcessedGroup;
  cloudImages: ProcessedGroup;
  containerImages: ProcessedGroup;
  liveImages: ProcessedGroup;
  rpiImages: ProcessedGroup;
  wslImages: ProcessedGroup;
  visionFive2Images: ProcessedGroup;
}

export type ProcessedArchitectures = Record<
  string,
  { versions: ProcessedVersion[] }
>;

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

export type Release = Pick<
  ProcessedVersion,
  "versionId" | "versionName" | "currentVersion" | "plannedEol"
>;

export type ResolvedGroup = ProcessedGroup & { key: GroupKey };
