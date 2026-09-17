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
