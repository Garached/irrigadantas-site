import { Hero } from "@/components/sections/Hero";
import { ServicesHighlight } from "@/components/sections/ServicesHighlight";
import { CtaQuote } from "@/components/sections/CtaQuote";
import { NewStore } from "@/components/sections/NewStore";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesHighlight />
      <NewStore />
      <CtaQuote />
    </>
  );
}
