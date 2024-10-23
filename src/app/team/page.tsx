import Container from "@/components/container";
import TitlePrimary from "@/components/title_primary";
import Paragraph from "@/components/paragraph";
import Card from "@/components/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "OpenZetrix - The Team",
    description: "The dedicated team members",
};

export default function Terms() {
    return (
        <Container activeKey="team">
            <TitlePrimary>The Team</TitlePrimary>
            <Paragraph>
                The OpenZetrix project was developed to offer development tools within the Zetrix ecosystem.
            </Paragraph>
            <Card className="mt-4">
                <Paragraph><span className="font-bold">Izad Imran Tan</span> - Founder</Paragraph>
            </Card>
            <Paragraph className="mt-4">Thank you to everyone who was involved both directly and indirectly in completing this project.</Paragraph>
        </Container>
    );
}
