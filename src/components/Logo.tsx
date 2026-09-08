import Link from "next/link";

type Props = {
  variant?: "dark" | "light";
  withText?: boolean;
  className?: string;
};

/**
 * Voryn Capital logo — an SVG recreation of the V monogram
 * (navy V with an upward growth stroke inside an open silver ring).
 * Swap this for the official logo asset when available.
 */
export default function Logo({ variant = "dark", withText = true, className = "" }: Props) {
  const navy = variant === "light" ? "#ffffff" : "#1b2a5b";
  const sub = variant === "light" ? "#c9a227" : "#6b7280";
  const ring = variant === "light" ? "rgba(255,255,255,0.55)" : "#9aa1ad";
  const arrow = "#c9a227";

  return (
    <Link href="/" aria-label="Voryn Capital — home" className={`inline-flex items-center gap-3 ${className}`}>
      <svg width="42" height="42" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        {/* open ring / swoosh */}
        <path
          d="M50 8 a42 42 0 1 1 -29.7 12.3"
          stroke={ring}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* bold V */}
        <path
          d="M26 30 L50 78 L74 30"
          stroke={navy}
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* upward growth stroke */}
        <path
          d="M46 66 L60 40 L70 46"
          stroke={arrow}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M70 46 L70 37 L61.5 40.5 Z" fill={arrow} />
      </svg>

      {withText && (
        <span className="leading-none">
          <span
            className="block font-display text-[1.35rem] font-extrabold tracking-tight"
            style={{ color: navy }}
          >
            VORYN
          </span>
          <span
            className="block text-[0.6rem] font-semibold tracking-[0.28em]"
            style={{ color: sub }}
          >
            CAPITAL LIMITED
          </span>
        </span>
      )}
    </Link>
  );
}
