import Link from "next/link";
import MastodonDialog from "./MastodonDialog";

interface ShareButtonsProps {
  slug: string;
}

const ShareButtons = ({ slug }: ShareButtonsProps) => {
  const facebookLink =
    "https://www.facebook.com/sharer/sharer.php?u=rockylinux.org/news/" + slug;
  const xLink =
    "https://twitter.com/intent/tweet?text=rockylinux.org/news/" + slug;
  const linkedInLink =
    "https://www.linkedin.com/sharing/share-offsite/?url=rockylinux.org/news/" +
    slug;

  return (
    <>
      <h3 className="text-sm text-center mb-2">Share:</h3>
      <div className="flex space-x-6 justify-center mb-12">
        <MastodonDialog />
        <Link
          href={facebookLink}
          className="hover:text-primary"
          target="_blank"
        >
          <span className="sr-only">Facebook</span>
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
          <span className="sr-only">LinkedIn</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </Link>
        <Link
          href={xLink}
          className="hover:text-primary"
          target="_blank"
        >
          <span className="sr-only">X</span>
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
          </svg>
        </Link>
      </div>
    </>
  );
};

export default ShareButtons;
