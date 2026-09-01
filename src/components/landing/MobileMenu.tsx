"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { LandingContent } from "@/content/types";

interface MobileMenuProps {
  accountHref: string;
  label: string;
  nav: LandingContent["header"]["nav"];
  primaryLabel: string;
}

export function MobileMenu({ accountHref, label, nav, primaryLabel }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return (
    <div className="mobile-menu" ref={rootRef}>
      <button
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={open ? "Закрыть меню" : label}
        className="mobile-menu__trigger"
        onClick={() => setOpen((value) => !value)}
        ref={triggerRef}
        type="button"
      >
        <span aria-hidden="true" className="mobile-menu__icons" data-open={open}>
          <Menu className="mobile-menu__icon mobile-menu__icon--menu" size={24} strokeWidth={1.8} />
          <X className="mobile-menu__icon mobile-menu__icon--close" size={24} strokeWidth={1.8} />
        </span>
      </button>
      {open ? (
        <div className="mobile-menu__panel" id="mobile-navigation">
          <nav aria-label="Мобильная навигация">
            {nav.map((item) => (
              <a href={item.href} key={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="button button--primary w-full" href={accountHref}>
            {primaryLabel}
          </a>
        </div>
      ) : null}
    </div>
  );
}
