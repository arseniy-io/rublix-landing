interface BrandProps {
  compact?: boolean;
  inverse?: boolean;
}

export function Brand({ compact = false, inverse = false }: BrandProps) {
  return (
    <span className="brand-lockup">
      <svg
        aria-hidden="true"
        className="brand-mark"
        focusable="false"
        viewBox="0 0 42 42"
      >
        <defs>
          <linearGradient id="brand-metal" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor={inverse ? "#ffffff" : "#101312"} />
            <stop offset="0.48" stopColor="#bfc7c2" />
            <stop offset="1" stopColor={inverse ? "#ffffff" : "#101312"} />
          </linearGradient>
        </defs>
        <path
          d="M8 7h16.4c6.4 0 10.6 3.7 10.6 9.3 0 4.4-2.7 7.6-7 8.7l7.8 10H27l-7-9.3h-4V35H8V18.8h16c1.9 0 3-1 3-2.5s-1.1-2.5-3-2.5H8V7Z"
          fill="url(#brand-metal)"
        />
        <path d="M8 20.2h8v14.9H8z" fill="#60c879" />
      </svg>
      <span className="brand-copy">
        <span className={inverse ? "text-white" : "text-ink"}>RUBLIX</span>
        {!compact ? (
          <span className={inverse ? "text-white/55" : "text-muted"}>Crypto Wallet</span>
        ) : null}
      </span>
    </span>
  );
}
