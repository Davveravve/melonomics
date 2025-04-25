"use client";

import React from 'react';

interface PanelProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  headerActions?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  variant?: 'default' | 'glass' | 'outline';
  glowEffect?: boolean;
}

export const Panel: React.FC<PanelProps> = ({
  children,
  title,
  className = '',
  headerActions,
  collapsible = false,
  defaultCollapsed = false,
  variant = 'default',
  glowEffect = false,
}) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  // Panel variant styles
  const variantStyles = {
    default: "bg-[#2C0A47] border border-[#a259ff40]",
    glass: "glass-panel",
    outline: "bg-[#2C0A4799] border-2 border-[#a259ff]",
  };

  // Base styles for the panel
  const panelClasses = `
    rounded-xl
    shadow-lg
    overflow-hidden
    ${glowEffect ? 'shadow-[0_0_15px_rgba(162,89,255,0.3)]' : ''}
    ${variantStyles[variant]}
    ${className}
  `;

  // Header styles with gradient
  const headerClasses = `
    px-5
    py-4
    flex 
    items-center 
    justify-between
    bg-gradient-to-r from-[#7928CA] to-[#a259ff]
    text-white
    font-medium
  `;

  // Title styles
  const titleClasses = `
    font-semibold 
    text-lg
    ${glowEffect ? 'text-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : ''}
  `;

  // Body styles
  const bodyClasses = `
    p-5
    ${collapsed ? 'hidden' : ''}
  `;

  return (
    <div className={panelClasses}>
      {title && (
        <div className={headerClasses}>
          <h3 className={titleClasses}>{title}</h3>
          <div className="flex items-center gap-2">
            {headerActions}
            {collapsible && (
              <button
                className="text-white hover:text-purple-200 w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#a259ff50] transition-colors"
                onClick={() => setCollapsed(!collapsed)}
                aria-label={collapsed ? "Expand panel" : "Collapse panel"}
              >
                {collapsed ? (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      )}
      <div className={bodyClasses}>
        {children}
      </div>
    </div>
  );
};

export default Panel;