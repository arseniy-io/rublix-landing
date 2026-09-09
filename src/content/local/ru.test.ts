import { describe, expect, it } from "vitest";

import { getLandingContent } from "@/content";
import { ruContent } from "@/content/local/ru";
import {
  CARD_PAYMENT_FEE,
  VISA_ISSUE_PRICE,
  WITHDRAWAL_FEE,
} from "@/content/productFacts";

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

  it("publishes the current Visa price, payment fee, and withdrawal fee consistently", () => {
    const visaCard = ruContent.cards.items.find((card) => card.kind === "visa");
    const paymentFeeRow = ruContent.tariffs.cardRows.find(
      (row) => row.label === "Комиссия за оплату",
    );
    const travelScenario = ruContent.scenarios.items.find(
      (scenario) => scenario.title === "Покупки в поездках",
    );

    expect(visaCard?.price).toBe(VISA_ISSUE_PRICE);
    expect(visaCard?.price).toBe("2 999 ₽");
    expect(ruContent.hero.facts.find((fact) => fact.label === "Visa")?.value).toContain(
      VISA_ISSUE_PRICE,
    );
    expect(paymentFeeRow?.mir).toBe(CARD_PAYMENT_FEE);
    expect(paymentFeeRow?.visa).toBe(CARD_PAYMENT_FEE);
    expect(CARD_PAYMENT_FEE).toBe("0%");
    expect(ruContent.wallet.operations[1].emphasis).toBe(`Комиссия - ${WITHDRAWAL_FEE}`);
    expect(ruContent.tariffs.summary.find((item) => item.label === "Вывод рублей")?.value).toBe(
      WITHDRAWAL_FEE,
    );
    expect(ruContent.tariffs.withdrawalNote).toContain("за вывод средств составляет 1%");
    expect(ruContent.cards.items.every((card) =>
      card.features.some(
        (feature) => feature.label === "Комиссия за оплату" && feature.value === CARD_PAYMENT_FEE,
      ),
    )).toBe(true);
    expect(travelScenario?.cardKind).toBe("visa");
  });

  it("publishes all confirmed Visa geography restrictions", () => {
    const visaCard = ruContent.cards.items.find((card) => card.kind === "visa");
    const geography = visaCard?.features.find((feature) => feature.label === "География")?.value;
    const serialized = JSON.stringify(ruContent);

    expect(geography).toBe("Не работает в России, Украине и Беларуси");
    expect(serialized).not.toContain("Visa не работает в Украине и Беларуси");
    expect(serialized).not.toContain("Карта не работает в Украине и Беларуси");
  });

  it("does not publish unverified absolute promises", () => {
    const serialized = JSON.stringify(ruContent).toLocaleLowerCase("ru-RU");

    expect(serialized).not.toContain("блокировок нет");
    expect(serialized).not.toContain("отказов не бывает");
    expect(serialized).not.toContain("работает везде");
    expect(serialized).not.toContain("полностью безопасно");
  });
});
