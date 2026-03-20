import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { JSX, SVGProps, Suspense } from "react";
import LanguagePickerWrapper from "@/components/LanguagePickerWrapper";
import type { Route } from "next";

export default function Footer() {
  const tFooter = useTranslations("footer");

  const navigation = {
    main: [
      { name: tFooter("nav.licensingName"), href: "/legal/licensing" },
      { name: tFooter("nav.privacyPolicyName"), href: "/legal/privacy" },
      { name: tFooter("nav.TrademarksName"), href: "/legal/trademarks" },
    ],
    social: [
      {
        name: tFooter("socialNav.bluesky"),
        href: "https://bsky.app/profile/rockylinux.org",
        icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
          <svg
            fill="currentColor"
            viewBox="0 0 600 530"
            className="h-5 w-5"
            {...props}
          >
            <path
              fill="currentColor"
              d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"
            />
          </svg>
        ),
      },
      {
        name: tFooter("socialNav.mastodon"),
        href: "https://fosstodon.org/@rockylinux",
        icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
          <svg
            fill="currentColor"
            viewBox="0 0 216.414 232.01"
            className="h-5 w-5"
            {...props}
          >
            <path
              fill="currentColor"
              d="M211.807 139.088c-3.18 16.366-28.492 34.277-57.562 37.748-15.159 1.809-30.084 3.471-45.999 2.741-26.027-1.192-46.565-6.212-46.565-6.212 0 2.534.156 4.946.469 7.202 3.384 25.687 25.47 27.225 46.391 27.943 21.116.723 39.919-5.206 39.919-5.206l.867 19.09s-14.77 7.931-41.08 9.39c-14.51.797-32.525-.365-53.507-5.919C9.232 213.82 1.406 165.311.209 116.091c-.365-14.613-.14-28.393-.14-39.918 0-50.33 32.976-65.083 32.976-65.083C49.672 3.454 78.204.242 107.865 0h.729c29.66.242 58.21 3.454 74.837 11.09 0 0 32.975 14.752 32.975 65.082 0 0 .414 37.134-4.599 62.916"
            />
            <path
              className="fill-background"
              d="M177.51 80.077v60.941h-24.144v-59.15c0-12.469-5.246-18.797-15.74-18.797-11.602 0-17.417 7.507-17.417 22.352V117.8H96.207V85.423c0-14.845-5.816-22.352-17.418-22.352-10.494 0-15.74 6.328-15.74 18.797v59.15H38.905V80.077c0-12.455 3.171-22.352 9.541-29.675 6.569-7.322 15.171-11.076 25.85-11.076 12.355 0 21.711 4.748 27.898 14.247l6.013 10.082 6.015-10.082c6.185-9.498 15.542-14.247 27.898-14.247 10.677 0 19.28 3.753 25.85 11.076 6.369 7.322 9.54 17.22 9.54 29.675"
            />
          </svg>
        ),
      },
      {
        name: tFooter("socialNav.linkedin"),
        href: "https://www.linkedin.com/company/rockylinux/",
        icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
          <svg
            fill="currentColor"
            viewBox="0 0 75 75"
            className="h-5 w-5"
            {...props}
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
        ),
      },
      {
        name: tFooter("socialNav.github"),
        href: "https://github.com/rocky-linux",
        icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            {...props}
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: tFooter("socialNav.youtube"),
        href: "https://www.youtube.com/@RockyLinux",
        icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            {...props}
          >
            <path
              fillRule="evenodd"
              d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
    ],
  };

  return (
    <footer>
      <div className="mx-auto max-w-7xl overflow-hidden px-2 lg:px-0 py-20 sm:py-24">
        <nav
          className="flex flex-wrap justify-center items-center gap-10"
          aria-label={tFooter("footer")}
        >
          <div className="flex items-center gap-4">
            {navigation.main.map((item) => (
              <div
                key={item.name}
                className="pb-6"
              >
                <Link
                  href={item.href as Route}
                  className="text-sm leading-6"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </nav>
        <div className="mt-6 flex flex-wrap justify-center items-center gap-y-6 gap-x-6">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-12 flex justify-center items-center">
          <Suspense fallback={<div className="w-[180px] h-[40px]" />}>
            <LanguagePickerWrapper />
          </Suspense>
        </div>
        <p className="mt-10 text-center text-xs leading-5">
          {tFooter("disclaimer")}
        </p>
      </div>
    </footer>
  );
}
