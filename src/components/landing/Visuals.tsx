import { ArrowDownToLine, ArrowUpRight, Plus, Repeat2 } from "lucide-react";

import { Brand } from "@/components/landing/Brand";
import { LandingIcon } from "@/components/landing/LandingIcon";
import type { IconName } from "@/content/types";

interface PaymentCardProps {
  kind: "mir" | "visa";
  className?: string;
  compact?: boolean;
}

export function PaymentCard({ kind, className = "", compact = false }: PaymentCardProps) {
  const isMir = kind === "mir";

  return (
    <div
      aria-hidden="true"
      className={`payment-card payment-card--${kind} ${compact ? "payment-card--compact" : ""} ${className}`}
    >
      <Brand compact inverse={!isMir} />
      <span className="payment-card__accent" />
      <span className="payment-card__caption">
        {isMir ? "МИР · РОССИЯ · 0 ₽" : "VISA · USD · 1 999 ₽"}
      </span>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="phone-mockup">
      <div className="phone-mockup__speaker" />
      <div className="phone-mockup__screen">
        <div className="phone-mockup__header">
          <span>Кошелёк</span>
          <span className="phone-mockup__dot" />
        </div>
        <div className="phone-balance">
          <span>Баланс в кошельке</span>
          <strong>129 450,00 ₽</strong>
          <small>● Активен</small>
        </div>
        <div className="phone-tabs">
          <span>МИР / РОССИЯ</span>
          <span>VISA / USD</span>
        </div>
        <div className="phone-transactions">
          <span>Последние операции</span>
          {["Пополнение", "Покупка", "Обмен", "Онлайн-покупка"].map((item, index) => (
            <div key={item}>
              <i />
              <span>{item}</span>
              <b>{index === 0 ? "+30 000 ₽" : `-${(index + 1) * 520} ₽`}</b>
            </div>
          ))}
        </div>
        <span className="phone-mockup__button">Пополнить</span>
      </div>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <span className="hero-visual__glow" />
      <span className="hero-visual__monogram">R</span>
      <PhoneMockup />
      <PaymentCard kind="mir" className="hero-card hero-card--mir" />
      <PaymentCard kind="visa" className="hero-card hero-card--visa" />
      <span className="hero-visual__floor" />
    </div>
  );
}

interface ScenarioVisualProps {
  icon: IconName;
  tone: "light" | "dark" | "neutral";
}

export function ScenarioVisual({ icon, tone }: ScenarioVisualProps) {
  return (
    <div className={`scenario-visual scenario-visual--${tone}`} aria-hidden="true">
      <span className="scenario-visual__orb">
        <LandingIcon name={icon} size={30} strokeWidth={1.5} />
      </span>
      <PaymentCard kind={tone === "dark" ? "visa" : "mir"} compact />
      <span className="scenario-visual__line" />
    </div>
  );
}

export function WalletPreview({ balance, activeLabel }: { balance: string; activeLabel: string }) {
  return (
    <div className="wallet-preview" aria-label={`Демонстрационный баланс кошелька: ${balance}`}>
      <div className="wallet-preview__topline">
        <Brand compact />
        <span>Кошелёк</span>
      </div>
      <div className="wallet-preview__grid">
        <div className="wallet-preview__balance">
          <span>Баланс</span>
          <strong>{balance}</strong>
          <small>● {activeLabel}</small>
        </div>
        <div className="wallet-preview__cards" aria-hidden="true">
          <span>Карты</span>
          <div>
            <PaymentCard kind="mir" compact />
            <PaymentCard kind="visa" compact />
          </div>
        </div>
      </div>
      <div className="wallet-preview__actions" aria-hidden="true">
        <span>
          <Plus size={18} /> Пополнить
        </span>
        <span>
          <ArrowUpRight size={18} /> Вывести
        </span>
        <span>
          <Repeat2 size={18} /> Перевести
        </span>
        <span className="wallet-preview__download">
          <ArrowDownToLine size={18} /> История
        </span>
      </div>
    </div>
  );
}
