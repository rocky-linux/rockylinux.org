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
  download: string;
  checksum: string;
  readMe?: string;
}

export interface DownloadOptions {
  defaultImages: {
    dvd: string;
    boot: string;
    minimal?: string;
  };
  cloudImages: {
    qcow2: string;
  };
  container: {
    fullImage: string;
    minimalImage: string;
  };
  liveImages?: {
    gnome: string;
    gnomeLite: string;
    kde?: string;
    xfce: string;
    mate: string;
    cinnamon?: string;
  };
  rpiImages?: {
    currentVersion?: string;
    download: string;
  };
  wslImages?: {
    currentVersion?: string;
    download: string;
  };
  visionfive2Images?: {
    currentVersion?: string;
    download: string;
  };
  specializedDevices?: SpecializedDevice[];
}

export interface Links {
  defaultImages: {
    torrent: string;
    checksum: string;
    baseOs: string;
    archived: string;
  };
  cloudImages: {
    checksum: string;
  };
  liveImages?: {
    checksums: string;
  };
  rpiImages?: {
    currentVersion?: string;
    checksum: string;
    readMe: string;
  };
  wslImages?: {
    currentVersion?: string;
    checksum: string;
    readMe: string;
  };
  visionfive2Images?: {
    currentVersion?: string;
    checksum: string;
    readMe?: string;
  };
  specializedDevices?: {
    name: string;
    checksum: string;
    readMe?: string;
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
