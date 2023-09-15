import Hero from "./hero/Hero";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rocky Linux",
};

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
