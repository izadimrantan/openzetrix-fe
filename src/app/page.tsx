"use client"

import Container from "@/components/container";
import TitlePrimary from "@/components/title_primary";
import TitleSecondary from "@/components/title_secondary";

export default function Home() {

  return (
    <Container activeKey="home">
      <div className="mx-auto max-w-none">
        <div className="text-center">
          <TitlePrimary>Zetrix Smart Contract, Made Easy.</TitlePrimary>
          <TitleSecondary className="mt-10">Standardized smart contracts.</TitleSecondary>
          <TitleSecondary>In minutes, not months.</TitleSecondary>
        </div>
      </div>
    </Container>
  );
}