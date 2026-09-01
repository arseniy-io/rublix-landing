"use client";

import { useEffect, useState } from "react";

interface MobileStickyCtaProps {
  href: string;
  label: string;
  event: string;
}

export function MobileStickyCta({ href, label, event }: MobileStickyCtaProps) {
  const [heroVisible, setHeroVisible] = useState(true);
  const [finalVisible, setFinalVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-primary-cta");
    const finalCta = document.getElementById("final-cta");

    if (!hero || !finalCta) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    const finalObserver = new IntersectionObserver(
      ([entry]) => setFinalVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );

    heroObserver.observe(hero);
    finalObserver.observe(finalCta);

    return () => {
      heroObserver.disconnect();
      finalObserver.disconnect();
    };
  }, []);

  if (heroVisible || finalVisible) return null;

  return (
    <div className="mobile-sticky-cta md:hidden">
      <a className="button button--primary w-full" data-analytics-event={event} href={href}>
        {label}
      </a>
    </div>
  );
}
