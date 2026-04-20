interface Props {
  className?: string;
  invert?: boolean;
  compact?: boolean;
}

export const Logo = ({ className = "", invert = false, compact = false }: Props) => (
  <div
    className={`inline-flex items-center ${compact ? "gap-2.5" : "gap-3"} ${invert ? "text-background" : "text-foreground"} ${className}`}
  >
    <svg
      viewBox="0 0 52 52"
      aria-hidden="true"
      className={compact ? "h-4 w-4" : "h-6 w-6"}
    >
      <rect x="4" y="7" width="38" height="8" rx="4" fill="currentColor" />
      <rect x="4" y="22" width="38" height="8" rx="4" fill="currentColor" />
      <rect x="4" y="37" width="20" height="8" rx="4" fill="currentColor" />
    </svg>
    <span
      className={`font-medium uppercase tracking-[0.22em] ${compact ? "text-sm" : "text-xl"}`}
    >
      Papiro
    </span>
  </div>
);
