export interface TorrentFile {
  /** Path of the file within the torrent, relative to its root directory. */
  path: string;
  /** Size of the file in bytes. */
  length: number;
}

export interface Torrent {
  /** Torrent display name, e.g. `Rocky-10.2-x86_64-dvd1`. */
  name: string;
  /** Point release the torrent belongs to, e.g. `10.2`. */
  release: string;
  /** Major version of the release, e.g. `10`. */
  majorVersion: string;
  /** Target architecture, e.g. `x86_64`. */
  arch: string;
  /** Image variant: `boot`, `dvd` or `minimal`. */
  variant: string;
  /** Absolute URL of the `.torrent` file on the master mirror. */
  torrentUrl: string;
  /** Size of the `.torrent` file itself, in bytes. */
  torrentSize: number;
  /** Hex-encoded SHA-1 hash of the torrent's info dictionary. */
  infoHash: string;
  /** Combined size of every file in the torrent, in bytes. */
  contentLength: number;
  /** Torrent piece size in bytes. */
  pieceLength: number;
  /** Files contained in the torrent. */
  files: TorrentFile[];
  /** Tracker announce URLs. */
  trackers: string[];
  /** Magnet URI including the info hash, display name and trackers. */
  magnet: string;
  /** ISO 8601 timestamp of when the torrent was created. */
  createdAt: string | null;
  /** ISO 8601 timestamp of the `.torrent` file's last modification. */
  lastModified: string | null;
}

export interface TorrentData {
  /** ISO 8601 timestamp of when the data file was generated. */
  generatedAt: string;
  /** Mirror the torrent list was crawled from. */
  source: string;
  /** Every torrent published under `/pub/rocky`. */
  torrents: Torrent[];
}
