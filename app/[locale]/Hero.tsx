import { ChevronRightIcon } from "@heroicons/react/20/solid";
import LinkButton from "@/components/buttons/LinkButton";
import Pill from "@/components/pills/Pill";

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <Pill>What&apos;s New</Pill>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>Version 9.2 Released</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-display">
            Enterprise Linux, the
            <span className="relative whitespace-nowrap text-green-500">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-green-300/40"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
              </svg>
              <span className="relative">community way.</span>
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Rocky Linux is a community-driven enterprise operating system that
            aims to provide full compatibility with Red Hat Enterprise Linux®.
            It is an open-source project that welcomes contributions from anyone
            who shares its vision and values. Rocky Linux is currently in active
            development and strives to achieve the highest standards of quality
            and reliability.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <LinkButton href="/download">Download</LinkButton>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Migrate <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="relative">
              <picture>
                <span className="absolute top-1 left-1 mt-1 ml-1 h-full w-full bg-black rounded-md"></span>
                <img
                  src="/images/rocky9.png"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="w-[76rem] fold-bold rounded-md relative inline-block h-full border-2 border-black/70 bg-white text-base font-semibold text-black"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
