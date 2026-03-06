// components/Button.tsx
// Reusable button component with 3 variants, disabled and loading states.

import React from 'react';

// ── Types ──────────────────────────────────────────────────────
type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize    = 'sm' | 'md' | 'lg';
type ButtonType    = 'button' | 'submit' | 'reset';

interface ButtonProps {
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  type?:     ButtonType;
  disabled?: boolean;
  loading?:  boolean;
  fullWidth?: boolean;
  children:  React.ReactNode;
  onClick?:  (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// ── Style Maps ─────────────────────────────────────────────────
const variantStyles: Record<ButtonVariant, string> = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  outline:   'btn-outline',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

// ── Spinner ────────────────────────────────────────────────────
function Spinner() {
  return (
    <span className="btn-spinner" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle
          cx="7" cy="7" r="5.5"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="2"
        />
        <path
          d="M7 1.5A5.5 5.5 0 0 1 12.5 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

// ── Component ──────────────────────────────────────────────────
function Button({
  variant   = 'primary',
  size      = 'md',
  type      = 'button',
  disabled  = false,
  loading   = false,
  fullWidth = false,
  children,
  onClick,
}: ButtonProps) {

  const isDisabled = disabled || loading;

  const classes = [
    'btn',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? 'btn-full' : '',
    isDisabled ? 'btn-disabled' : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      onClick={onClick}
      aria-disabled={isDisabled}
      aria-busy={loading}
    >
      {loading && <Spinner />}
      <span className={loading ? 'btn-label-loading' : ''}>
        {children}
      </span>
    </button>
  );
}

export default Button;