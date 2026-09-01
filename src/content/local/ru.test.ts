import { describe, expect, it } from "vitest";

import { getLandingContent } from "@/content";
import { ruContent } from "@/content/local/ru";

describe("Russian landing content", () => {
  it("keeps the landing independent and points every account CTA to the confirmed cabinet", async () => {
    const content = await getLandingContent("ru");
    const expected = "https://lk.rublix-wallet.com";

    expect(content.links.account).toBe(expected);
    expect(content.hero.primary.href).toBe(expected);
    expect(content.cards.items.every((card) => card.action.href === expected)).toBe(true);
    expect(content.steps.action.href).toBe(expected);
    expect(content.finalCta.primary.href).toBe(expected);
  });

  it("shows the zero separate top-up fee together with the Rublix exchange-rate caveat", () => {
    const topUp = ruContent.wallet.operations[0];

    expect(topUp.emphasis).toContain("0%");
    expect(topUp.description).toContain("курсу Rublix");
    expect(topUp.description).toContain("итоговая сумма");
  });

  it("keeps unknown Visa and USDT limits explicit", () => {
    const visaDaily = ruContent.tariffs.cardRows.find((row) => row.label === "В сутки");

    expect(visaDaily?.visa).toBe("Не указано");
    expect(ruContent.tariffs.withdrawalNote).toContain("USDT");
    expect(ruContent.tariffs.withdrawalNote).toContain("уточняйте отдельно");
  });

  it("does not publish unverified absolute promises", () => {
    const serialized = JSON.stringify(ruContent).toLocaleLowerCase("ru-RU");

    expect(serialized).not.toContain("блокировок нет");
    expect(serialized).not.toContain("отказов не бывает");
    expect(serialized).not.toContain("работает везде");
    expect(serialized).not.toContain("полностью безопасно");
  });
});
