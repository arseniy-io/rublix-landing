import { ruContent } from "@/content/local/ru";
import type { LandingContent, LandingContentSource, Locale } from "@/content/types";

class LocalLandingContentSource implements LandingContentSource {
  async get(locale: Locale): Promise<LandingContent> {
    if (locale !== "ru") {
      throw new Error(`Unsupported landing locale: ${locale satisfies never}`);
    }

    return ruContent;
  }
}

const source: LandingContentSource = new LocalLandingContentSource();

export function getLandingContent(locale: Locale): Promise<LandingContent> {
  return source.get(locale);
}

export type { LandingContent, LandingContentSource, Locale } from "@/content/types";
