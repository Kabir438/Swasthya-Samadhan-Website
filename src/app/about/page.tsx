import Header from "@/components/header";
import { TextRevealCard } from "@/components/text-reveal";

export default function About() {
  return (
    // <SmoothScroll>
    <>
      <Header />
      <main>
        <TextRevealCard
          text={`Meet the Team`}
          revealText="We want some credit"
        ></TextRevealCard>
      </main>
    </>
  );
}
