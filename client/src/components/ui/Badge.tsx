import React from "react";

export type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "primary"
  | "secondary"
  | "tertiary"
  | "neutral"
  | "dark";

export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  pulse?: boolean;
  icon?: string;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]",
  warning: "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]",
  danger: "bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]",
  primary: "bg-primary-fixed text-on-primary-fixed",
  secondary: "bg-secondary-fixed text-on-secondary-fixed",
  tertiary: "bg-tertiary-container text-on-tertiary",
  neutral: "bg-surface-container-low text-on-surface-variant border border-outline-variant/30",
  dark: "bg-primary text-on-primary",
};

const dotColors: Record<BadgeVariant, string> = {
  success: "bg-[#16A34A]",
  warning: "bg-[#D97706]",
  danger: "bg-[#DC2626]",
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  neutral: "bg-outline",
  dark: "bg-white",
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "neutral",
  size = "md",
  dot = false,
  pulse = false,
  icon,
  children,
  className = "",
  ...props
}) => {
  const sizeStyle =
    size === "sm"
      ? "px-2 py-0.5 text-[11px] leading-tight"
      : "px-2.5 py-1 text-xs leading-normal";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors ${variantStyles[variant]} ${sizeStyle} ${className}`}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2 shrink-0">
          {pulse && (
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${dotColors[variant]}`}
            />
          )}
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${dotColors[variant]}`}
          />
        </span>
      )}
      {icon && (
        <span className="material-symbols-outlined text-[14px] leading-none shrink-0">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};
