import React from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-container shadow-sm",
  secondary: "bg-secondary text-on-secondary hover:bg-secondary-container shadow-sm",
  outline: "border border-outline-variant text-on-surface-variant hover:text-primary hover:bg-surface-container",
  ghost: "text-on-surface-variant hover:text-primary hover:bg-surface-container",
  danger: "bg-[#DC2626] text-white hover:bg-red-700 shadow-sm",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-xs font-semibold rounded-md",
  md: "px-4 py-2 text-sm font-semibold rounded-lg",
  lg: "px-6 py-2.5 text-base font-semibold rounded-xl",
  icon: "p-2 rounded-lg flex items-center justify-center",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer select-none font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="material-symbols-outlined text-[18px] leading-none shrink-0">
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="material-symbols-outlined text-[18px] leading-none shrink-0">
          {icon}
        </span>
      )}
    </button>
  );
};
