import type { Metadata } from "next";

import { LandingPage } from "@/components/landing/LandingPage";
import { getLandingContent } from "@/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLandingContent("ru");

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: "/ru",
    },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: "/ru",
      siteName: "Rublix",
      title: content.metadata.title,
      description: content.metadata.description,
    },
    twitter: {
      card: "summary_large_image",
      title: content.metadata.title,
      description: content.metadata.description,
    },
  };
}

export default async function RussianLandingPage() {
  const content = await getLandingContent("ru");

  return <LandingPage content={content} />;
}
