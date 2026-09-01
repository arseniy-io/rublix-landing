import { ChevronDown, Headphones, MoveRight } from "lucide-react";

import { Brand } from "@/components/landing/Brand";
import { LandingIcon } from "@/components/landing/LandingIcon";
import { MobileMenu } from "@/components/landing/MobileMenu";
import { MobileStickyCta } from "@/components/landing/MobileStickyCta";
import {
  HeroVisual,
  PaymentCard,
  ScenarioVisual,
  WalletPreview,
} from "@/components/landing/Visuals";
import type { LandingContent, LinkAction } from "@/content/types";

interface LandingPageProps {
  content: LandingContent;
}

function ActionLink({ action, variant = "primary", id }: {
  action: LinkAction;
  variant?: "primary" | "secondary" | "inverse";
  id?: string;
}) {
  return (
    <a
      className={`button button--${variant}`}
      data-analytics-event={action.event}
      href={action.href}
      id={id}
    >
      <span>{action.label}</span>
      {variant === "primary" || variant === "inverse" ? (
        <MoveRight aria-hidden="true" size={18} strokeWidth={2} />
      ) : null}
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="section-heading">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}

function LanguageSwitch({ content }: LandingPageProps) {
  return (
    <div aria-label="Язык сайта" className="language-switch">
      <span aria-current="page">{content.header.currentLanguage}</span>
      <span aria-hidden="true">/</span>
      <span aria-disabled="true" title={content.header.unavailableLanguageHint}>
        {content.header.unavailableLanguage}
      </span>
    </div>
  );
}

function Header({ content }: LandingPageProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner page-shell">
        <a aria-label="Rublix - начало страницы" className="site-logo" href="#top">
          <Brand />
        </a>

        <nav aria-label="Основная навигация" className="site-nav">
          {content.header.nav.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <LanguageSwitch content={content} />
          <a
            className="button button--quiet"
            data-analytics-event="header_account_click"
            href={content.links.account}
          >
            {content.header.accountLabel}
          </a>
          <a
            className="button button--primary button--header"
            data-analytics-event="header_primary_click"
            href={content.links.account}
          >
            {content.header.primaryLabel}
          </a>
        </div>

        <div className="mobile-header-actions">
          <LanguageSwitch content={content} />
          <MobileMenu
            accountHref={content.links.account}
            label={content.header.menuLabel}
            nav={content.header.nav}
            primaryLabel={content.header.primaryLabel}
          />
        </div>
      </div>
    </header>
  );
}

function Hero({ content }: LandingPageProps) {
  return (
    <section className="hero page-shell" id="top">
      <div className="hero__copy">
        <p className="eyebrow">{content.hero.eyebrow}</p>
        <h1>{content.hero.title}</h1>
        <p className="hero__subtitle">{content.hero.subtitle}</p>
        <p className="hero__description">{content.hero.description}</p>
        <div className="hero__actions">
          <ActionLink action={content.hero.primary} id="hero-primary-cta" />
          <ActionLink action={content.hero.secondary} variant="secondary" />
        </div>
        <p className="hero__note">{content.hero.note}</p>
      </div>

      <HeroVisual />

      <ul className="hero-facts" aria-label="Коротко об условиях">
        {content.hero.facts.map((fact) => (
          <li key={fact.label}>
            <span className="icon-chip">
              <LandingIcon name={fact.icon} size={20} strokeWidth={1.8} />
            </span>
            <span>
              <strong>{fact.label}</strong>
              <small>{fact.value}</small>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Scenarios({ content }: LandingPageProps) {
  return (
    <section className="section page-shell" aria-labelledby="scenarios-title">
      <div className="section-heading section-heading--row">
        <h2 id="scenarios-title">{content.scenarios.title}</h2>
        <p>{content.scenarios.intro}</p>
      </div>
      <div className="scenario-grid">
        {content.scenarios.items.map((item) => (
          <article className="scenario-card" key={item.title}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <ScenarioVisual icon={item.icon} tone={item.tone} cardKind={item.cardKind} />
          </article>
        ))}
      </div>
    </section>
  );
}

function Cards({ content }: LandingPageProps) {
  return (
    <section className="section page-shell scroll-mt-28" id="cards">
      <SectionHeading title={content.cards.title} intro={content.cards.intro} />
      <div className="product-card-grid">
        {content.cards.items.map((card) => {
          const dark = card.kind === "visa";
          return (
            <article className={`product-card product-card--${card.kind}`} key={card.kind}>
              <div className="product-card__copy">
                <p className="product-card__name">{card.name}</p>
                <p className="product-card__price">{card.price}</p>
                <p className="product-card__currency">{card.currency}</p>
                <p className="product-card__purpose">{card.purpose}</p>
              </div>
              <PaymentCard kind={card.kind} />
              <ul className="feature-list">
                {card.features.map((feature) => (
                  <li key={feature.label}>
                    <span>{feature.label}</span>
                    <strong>{feature.value}</strong>
                  </li>
                ))}
              </ul>
              <ActionLink action={card.action} variant={dark ? "inverse" : "primary"} />
            </article>
          );
        })}
      </div>
      <p className="section-note">{content.cards.note}</p>
    </section>
  );
}

function Wallet({ content }: LandingPageProps) {
  return (
    <section className="section page-shell scroll-mt-28" id="wallet">
      <SectionHeading title={content.wallet.title} intro={content.wallet.intro} />
      <div className="wallet-grid">
        <WalletPreview balance={content.wallet.balance} activeLabel={content.wallet.activeLabel} />
        <div className="wallet-operations">
          {content.wallet.operations.map((operation) => (
            <article className="operation-card" key={operation.title}>
              <span className="operation-card__icon">
                <LandingIcon name={operation.icon} size={24} strokeWidth={1.7} />
              </span>
              <div>
                <p className="operation-card__eyebrow">{operation.title}</p>
                <h3>{operation.emphasis}</h3>
                <p>{operation.description}</p>
                <ul aria-label={`Способы: ${operation.title}`} className="tag-list">
                  {operation.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps({ content }: LandingPageProps) {
  return (
    <section className="section section--soft scroll-mt-28" id="steps">
      <div className="page-shell">
        <SectionHeading title={content.steps.title} />
        <ol className="steps-list">
          {content.steps.items.map((step, index) => (
            <li key={step.title}>
              <span className="steps-list__number">{index + 1}</span>
              <span className="steps-list__icon">
                <LandingIcon name={step.icon} size={25} strokeWidth={1.6} />
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="steps-footer">
          <p>
            <LandingIcon name="clock" size={19} strokeWidth={1.7} />
            {content.steps.note}
          </p>
          <ActionLink action={content.steps.action} variant="secondary" />
        </div>
      </div>
    </section>
  );
}

function CardLimits({ content }: LandingPageProps) {
  return (
    <div className="tariff-detail-card">
      <h3>{content.tariffs.cardsTitle}</h3>
      <div className="desktop-table">
        <table>
          <caption className="sr-only">Сравнение лимитов карт МИР и Visa</caption>
          <thead>
            <tr>
              <th scope="col">Условие</th>
              <th scope="col">МИР</th>
              <th scope="col">Visa</th>
            </tr>
          </thead>
          <tbody>
            {content.tariffs.cardRows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{row.mir}</td>
                <td>{row.visa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mobile-limit-list">
        {content.tariffs.cardRows.map((row) => (
          <dl key={row.label}>
            <dt>{row.label}</dt>
            <div>
              <dd><span>МИР</span>{row.mir}</dd>
              <dd><span>Visa</span>{row.visa}</dd>
            </div>
          </dl>
        ))}
      </div>
      <p className="fine-print">{content.tariffs.cardNote}</p>
    </div>
  );
}

function WithdrawalLimits({ content }: LandingPageProps) {
  return (
    <div className="tariff-detail-card">
      <h3>{content.tariffs.withdrawalTitle}</h3>
      <div className="desktop-table">
        <table>
          <caption className="sr-only">Лимиты вывода из кошелька</caption>
          <thead>
            <tr>
              <th scope="col">Способ</th>
              <th scope="col">За операцию</th>
              <th scope="col">В сутки</th>
              <th scope="col">В месяц</th>
            </tr>
          </thead>
          <tbody>
            {content.tariffs.withdrawalRows.map((row) => (
              <tr key={row.method}>
                <th scope="row">{row.method}</th>
                <td>{row.operation}</td>
                <td>{row.daily}</td>
                <td>{row.monthly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mobile-withdrawals">
        {content.tariffs.withdrawalRows.map((row) => (
          <details key={row.method}>
            <summary>
              <span>{row.method}</span>
              <ChevronDown aria-hidden="true" size={18} />
            </summary>
            <dl>
              <div><dt>За операцию</dt><dd>{row.operation}</dd></div>
              <div><dt>В сутки</dt><dd>{row.daily}</dd></div>
              <div><dt>В месяц</dt><dd>{row.monthly}</dd></div>
            </dl>
          </details>
        ))}
      </div>
      <p className="fine-print">{content.tariffs.withdrawalNote}</p>
    </div>
  );
}

function Tariffs({ content }: LandingPageProps) {
  return (
    <section className="section page-shell scroll-mt-28" id="tariffs">
      <div className="tariffs-heading">
        <SectionHeading title={content.tariffs.title} intro={content.tariffs.intro} />
        <p>{content.tariffs.snapshot}</p>
      </div>
      <div className="tariff-summary-grid">
        {content.tariffs.summary.map((item) => (
          <article key={item.label}>
            <LandingIcon name={item.icon} size={22} strokeWidth={1.6} />
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
      <div className="tariff-details-grid">
        <CardLimits content={content} />
        <div className="tariff-detail-card tariff-detail-card--qr">
          <h3>{content.tariffs.qrTitle}</h3>
          <ul>
            {content.tariffs.qrItems.map((item) => (
              <li key={item}>
                <LandingIcon name="check" size={18} strokeWidth={2} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <WithdrawalLimits content={content} />
      </div>
    </section>
  );
}

function Restrictions({ content }: LandingPageProps) {
  return (
    <section className="section section--soft">
      <div className="page-shell">
        <SectionHeading title={content.restrictions.title} intro={content.restrictions.intro} />
        <ul className="restriction-grid">
          {content.restrictions.items.map((item) => (
            <li key={item.text}>
              <span>
                <LandingIcon name={item.icon} size={24} strokeWidth={1.6} />
              </span>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HelpAndFaq({ content }: LandingPageProps) {
  return (
    <section className="section page-shell scroll-mt-28" id="faq">
      <div className="help-grid">
        <div>
          <SectionHeading title={content.faq.title} />
          <div className="faq-list">
            {content.faq.items.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>
                  <span>{item.question}</span>
                  <ChevronDown aria-hidden="true" size={20} strokeWidth={1.7} />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <aside className="support-card" aria-labelledby="support-title">
          <span className="support-card__icon">
            <Headphones aria-hidden="true" size={34} strokeWidth={1.5} />
          </span>
          <p className="eyebrow">{content.help.supportLabel}</p>
          <h2 id="support-title">{content.help.title}</h2>
          <p>{content.help.description}</p>
          <strong>{content.help.supportHandle}</strong>
          <ActionLink action={content.help.action} variant="secondary" />
        </aside>
      </div>
    </section>
  );
}

function FinalCta({ content }: LandingPageProps) {
  return (
    <section className="final-cta page-shell" id="final-cta">
      <div className="final-cta__brand" aria-hidden="true">
        <span>R</span>
      </div>
      <div className="final-cta__copy">
        <h2>{content.finalCta.title}</h2>
        <p>{content.finalCta.description}</p>
        <div>
          <ActionLink action={content.finalCta.primary} />
          <ActionLink action={content.finalCta.secondary} variant="inverse" />
        </div>
        <small>{content.finalCta.note}</small>
      </div>
    </section>
  );
}

function Footer({ content }: LandingPageProps) {
  return (
    <footer className="site-footer page-shell">
      <div className="site-footer__brand">
        <a aria-label="Rublix - начало страницы" href="#top">
          <Brand />
        </a>
        <p>{content.footer.description}</p>
      </div>
      <nav aria-label="Навигация в подвале">
        {content.footer.nav.map((item) => (
          <a href={item.href} key={`${item.label}-${item.href}`}>
            {item.label}
          </a>
        ))}
      </nav>
      <LanguageSwitch content={content} />
      <p className="site-footer__legal">{content.footer.legalNote}</p>
    </footer>
  );
}

export function LandingPage({ content }: LandingPageProps) {
  return (
    <>
      <a className="skip-link" href="#content">Перейти к содержанию</a>
      <Header content={content} />
      <main id="content">
        <Hero content={content} />
        <Scenarios content={content} />
        <Cards content={content} />
        <Wallet content={content} />
        <Steps content={content} />
        <Tariffs content={content} />
        <Restrictions content={content} />
        <HelpAndFaq content={content} />
        <FinalCta content={content} />
      </main>
      <Footer content={content} />
      <MobileStickyCta
        event="mobile_sticky_account_click"
        href={content.links.account}
        label={content.header.primaryLabel}
      />
    </>
  );
}
