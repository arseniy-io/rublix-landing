export type Locale = "ru";

export type IconName =
  | "card"
  | "check"
  | "clock"
  | "globe"
  | "info"
  | "plane"
  | "refresh"
  | "send"
  | "shopping-bag"
  | "smartphone"
  | "store"
  | "wallet";

export interface LinkAction {
  label: string;
  href: string;
  event: string;
}

export interface LandingContent {
  locale: Locale;
  metadata: {
    title: string;
    description: string;
  };
  links: {
    account: string;
    support: string;
  };
  header: {
    nav: Array<{ label: string; href: string }>;
    accountLabel: string;
    primaryLabel: string;
    menuLabel: string;
    currentLanguage: string;
    unavailableLanguage: string;
    unavailableLanguageHint: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    primary: LinkAction;
    secondary: LinkAction;
    note: string;
    facts: Array<{ icon: IconName; label: string; value: string }>;
  };
  scenarios: {
    title: string;
    intro: string;
    items: Array<{
      icon: IconName;
      title: string;
      description: string;
      tone: "light" | "dark" | "neutral";
    }>;
  };
  cards: {
    title: string;
    intro: string;
    items: Array<{
      kind: "mir" | "visa";
      name: string;
      purpose: string;
      price: string;
      currency: string;
      features: Array<{ label: string; value: string }>;
      action: LinkAction;
    }>;
    note: string;
  };
  wallet: {
    title: string;
    intro: string;
    balanceLabel: string;
    balance: string;
    activeLabel: string;
    operations: Array<{
      icon: IconName;
      title: string;
      emphasis: string;
      description: string;
      tags: string[];
    }>;
  };
  steps: {
    title: string;
    items: Array<{ title: string; description: string; icon: IconName }>;
    note: string;
    action: LinkAction;
  };
  tariffs: {
    title: string;
    snapshot: string;
    intro: string;
    summary: Array<{ icon: IconName; label: string; value: string }>;
    cardsTitle: string;
    cardRows: Array<{ label: string; mir: string; visa: string }>;
    cardNote: string;
    qrTitle: string;
    qrItems: string[];
    withdrawalTitle: string;
    withdrawalRows: Array<{
      method: string;
      operation: string;
      daily: string;
      monthly: string;
    }>;
    withdrawalNote: string;
  };
  restrictions: {
    title: string;
    intro: string;
    items: Array<{ icon: IconName; text: string }>;
  };
  help: {
    title: string;
    description: string;
    supportLabel: string;
    supportHandle: string;
    action: LinkAction;
  };
  faq: {
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  finalCta: {
    title: string;
    description: string;
    primary: LinkAction;
    secondary: LinkAction;
    note: string;
  };
  footer: {
    description: string;
    nav: Array<{ label: string; href: string }>;
    legalNote: string;
  };
}

export interface LandingContentSource {
  get(locale: Locale): Promise<LandingContent>;
}
