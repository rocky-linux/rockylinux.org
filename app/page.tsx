import type { Metadata } from "next";
import Hero from "@/app/Hero";

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
