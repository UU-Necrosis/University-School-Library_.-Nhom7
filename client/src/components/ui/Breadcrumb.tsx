import React from "react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: "default" | "dark" | "tertiary";
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  variant = "default",
  className = "",
}) => {
  const containerColors = {
    default: "text-on-surface-variant",
    dark: "text-primary-fixed",
    tertiary: "text-tertiary-fixed",
  };

  const linkColors = {
    default: "hover:text-secondary",
    dark: "hover:underline text-primary-fixed",
    tertiary: "hover:underline text-tertiary-fixed",
  };

  const activeColors = {
    default: "text-primary font-semibold",
    dark: "text-white font-semibold",
    tertiary: "text-white font-semibold",
  };

  const separatorColors = {
    default: "text-outline-variant",
    dark: "opacity-60",
    tertiary: "opacity-60",
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-space-xs font-label-md text-label-md flex-wrap ${containerColors[variant]} ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {index > 0 && <span className={separatorColors[variant]}>/</span>}
            {isLast || !item.href ? (
              <span className={`flex items-center gap-space-xs ${activeColors[variant]}`}>
                {item.icon && (
                  <span className="material-symbols-outlined text-[16px]">
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </span>
            ) : (
              <Link
                href={item.href}
                className={`flex items-center gap-space-xs transition-colors ${linkColors[variant]}`}
              >
                {item.icon && (
                  <span className="material-symbols-outlined text-[16px]">
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
