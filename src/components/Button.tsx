// components/Button.tsx
// Reusable Button with Tailwind CSS, supports loading, disabled, icons, fullWidth, and accessibility

import React from "react";

// ── Types ────────────────────────────────────────────────
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;       // leading icon
  iconRight?: React.ReactNode;  // trailing icon
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

// ── Spinner ─────────────────────────────────────────────
function Spinner({ size }: { size: ButtonSize }) {
  const dim: Record<ButtonSize, number> = { xs: 12, sm: 13, md: 15, lg: 17, xl: 19 };
  const d = dim[size];
  return (
    <span className="animate-spin inline-flex" aria-hidden="true">
      <svg width={d} height={d} viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
        <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

// ── Style Definitions ──────────────────────────────────
// ── Style Definitions ──────────────────────────────────
const base = "relative inline-flex items-center justify-center gap-2 font-semibold tracking-tight leading-none transition-all duration-150 ease-out rounded-lg select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:pointer-events-none disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  primary:   "bg-indigo-500 text-white hover:bg-indigo-400 active:bg-indigo-600 focus-visible:ring-indigo-500",
  secondary: "bg-green-600 text-white hover:bg-green-500 active:bg-green-700 focus-visible:ring-green-500",
  outline:   "bg-transparent text-neutral-200 border border-neutral-700 hover:bg-neutral-800/60 active:bg-neutral-800 focus-visible:ring-neutral-500",
  ghost:     "bg-transparent text-neutral-400 hover:bg-neutral-800/70 active:bg-neutral-700/60 focus-visible:ring-neutral-500",
  danger:    "bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700 focus-visible:ring-rose-500",
};

const sizes: Record<ButtonSize, string> = {
  xs: "h-7 px-2.5 text-xs gap-1.5",
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-9 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-base gap-2",
  xl: "h-12 px-6 text-base gap-2.5",
};

// ── Component ─────────────────────────────────────────
function Button({
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconRight,
  children,
  onClick,
  className = "",
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const classes = [
    base,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      onClick={onClick}
      aria-disabled={isDisabled}
      aria-busy={loading}
    >
      <div className="flex items-center justify-center gap-2">
        {loading ? (
          <Spinner size={size} />
        ) : (
          icon && <span className="shrink-0">{icon}</span>
        )}
        <span className={loading ? "opacity-70" : ""}>{children}</span>
        {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
      </div>
    </button>
  );
}

export default Button;

// ── Usage Examples ──────────────────────────────────────
// <Button variant="primary" size="md" loading fullWidth>Logging in…</Button>
// <Button variant="secondary" size="lg" icon={<ArrowRight size={16} />}>Continue</Button>
// <Button variant="danger" loading>Deleting…</Button>
// <Button variant="outline" iconRight={<ArrowRight size={14} />}>Learn more</Button>