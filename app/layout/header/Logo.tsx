import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="-m-1.5 p-1.5">
      <span className="sr-only">Rocky Linux</span>
      <picture>
        <img
          className="h-8 w-auto"
          src="/images/logo.svg"
          alt="Rocky Linux Logo"
        />
      </picture>
    </Link>
  );
};

export default Logo;
