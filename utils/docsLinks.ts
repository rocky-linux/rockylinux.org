import { majorVersion } from "@/utils/downloadSelection";

const DOCS = "https://docs.rockylinux.org";

/**
 * Installation guide paths per major release on docs.rockylinux.org. Rocky 8
 * and 9 name theirs after the minor release, so check these when the docs
 * site publishes a new guide.
 */
const INSTALL_GUIDES: Record<string, string> = {
  "8": "guides/8_6_installation/",
  "9": "guides/9_6_installation/",
  "10": "guides/installation/",
};

// Majors with their own version of the docs site
const VERSIONED_DOCS = new Set(Object.keys(INSTALL_GUIDES));

export interface DocsUrls {
  home: string;
  install: string;
  migrate: string;
}

/**
 * Documentation links for a release. Releases the docs site has no version
 * for (yet) link to the unversioned site, which always shows the latest.
 *
 * @param versionId - Release id, e.g. "rocky-10".
 * @returns URLs for the docs home, installation guide and migration guide.
 */
export function docsUrls(versionId: string): DocsUrls {
  const major = majorVersion(versionId);
  const base = VERSIONED_DOCS.has(major) ? `${DOCS}/${major}` : DOCS;
  return {
    home: `${base}/`,
    install: `${base}/${INSTALL_GUIDES[major] ?? "guides/installation/"}`,
    migrate: `${base}/guides/migrate2rocky/`,
  };
}
