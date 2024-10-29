"use client"

import Container from "@/components/container";
import TitlePrimary from "@/components/title_primary";
import TitleSecondary from "@/components/title_secondary";

export default function Home() {

  return (
    <Container activeKey="home">
      <div className="mx-auto max-w-none">
        <div className="text-left">
          <TitlePrimary delay={0}>Zetrix Smart Contract, Made Easy.</TitlePrimary>
          <TitleSecondary className="mt-10" delay={3.5}>Standardized smart contracts.</TitleSecondary>
          <TitleSecondary className="mt-1" delay={6.5}>In minutes, not months.</TitleSecondary>
        </div>
      </div>
    </Container>
  );
}