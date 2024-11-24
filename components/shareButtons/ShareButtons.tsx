import { useTranslations } from "next-intl";
import Link from "next/link";

import MastodonDialog from "./MastodonDialog";

interface ShareButtonsProps {
  url: string;
}

const ShareButtons = ({ url }: ShareButtonsProps) => {
  const t = useTranslations("share");

  const blueskyLink = `https://bsky.app/intent/compose?text=${url}`;
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const linkedInLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  const threadsLink = `https://threads.net/intent/post?text=${url}`;

  return (
    <>
      <h3 className="text-sm text-center mb-2">{t("shareName")}</h3>
      <div className="flex space-x-6 justify-center items-center mb-12">
        <Link
          href={blueskyLink}
          className="hover:text-primary"
          target="_blank"
        >
          <span className="sr-only">{t("bluesky")}</span>
          <svg
            fill="currentColor"
            viewBox="0 0 600 530"
            className="h-5 w-5"
          >
            <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z" />
          </svg>
        </Link>
        <MastodonDialog
          invalidUrlMsg={t("mastodon.url-valid")}
          urlMsg={t("mastodon.url")}
          shareMsg={t("shareName")}
          mastodonSrMsg={t("mastodon.name")}
          url={url}
        />
        <Link
          href={threadsLink}
          className="hover:text-primary"
          target="_blank"
        >
          <span className="sr-only">{t("threads")}</span>
          <svg
            fill="currentColor"
            viewBox="0 0 192 192"
            className="h-5 w-5"
          >
            <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.07 0h-.113C68.882.194 47.292 9.642 32.788 28.08 19.882 44.485 13.224 67.315 13.001 95.932L13 96v.067c.224 28.617 6.882 51.447 19.788 67.854C47.292 182.358 68.882 191.806 96.957 192h.113c24.96-.173 42.554-6.708 57.048-21.189 18.963-18.945 18.392-42.692 12.142-57.27-4.484-10.454-13.033-18.945-24.723-24.553ZM98.44 129.507c-10.44.588-21.286-4.098-21.82-14.135-.397-7.442 5.296-15.746 22.461-16.735 1.966-.114 3.895-.169 5.79-.169 6.235 0 12.068.606 17.371 1.765-1.978 24.702-13.58 28.713-23.802 29.274Z" />
          </svg>
        </Link>
        <Link
          href={facebookLink}
          className="hover:text-primary"
          target="_blank"
        >
          <span className="sr-only">{t("facebook")}</span>
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <Link
          href={linkedInLink}
          className="hover:text-primary"
          target="_blank"
        >
          <span className="sr-only">{t("linkedin")}</span>
          <svg
            fill="currentColor"
            viewBox="0 0 75 75"
            className="h-5 w-5"
          >
            <g
              fill="none"
              fillRule="evenodd"
            >
              <path
                fill="currentColor"
                d="M8 72h56a8 8 0 0 0 8-8V8a8 8 0 0 0-8-8H8a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8Z"
              />
              <path
                className="fill-background"
                d="M62 62H51.316V43.802c0-4.99-1.896-7.777-5.845-7.777-4.296 0-6.54 2.901-6.54 7.777V62H28.632V27.333H38.93v4.67s3.096-5.729 10.453-5.729c7.353 0 12.617 4.49 12.617 13.777V62ZM16.35 22.794c-3.508 0-6.35-2.864-6.35-6.397C10 12.864 12.842 10 16.35 10c3.507 0 6.347 2.864 6.347 6.397 0 3.533-2.84 6.397-6.348 6.397ZM11.032 62h10.736V27.333H11.033V62Z"
              />
            </g>
          </svg>
        </Link>
      </div>
    </>
  );
};

export default ShareButtons;
