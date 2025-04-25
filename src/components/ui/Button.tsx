"use client";

import React from 'react';
import { Theme } from '@/styles/theme';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  icon?: React.ReactNode;
  pulse?: boolean;
  glow?: boolean;
  theme?: Theme;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
  icon,
  pulse = false,
  glow = false,
  theme,
  ...rest
}) => {
  // Base styles for all buttons
  const baseStyles = `
    font-medium
    rounded-lg
    transition-all
    flex
    items-center
    justify-center
    gap-2
    ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:transform hover:-translate-y-1'}
    ${fullWidth ? 'w-full' : ''}
    ${pulse ? 'animate-pulse-slow' : ''}
  `;

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  // Modern variants with neon effects
  const variantStyles = {
    primary: `
      bg-[#381c5b]
      text-white
      ${glow ? 'shadow-[0_0_15px_rgba(162,89,255,0.7)]' : 'shadow-md'}
      hover:bg-[#4B2A77]
      hover:shadow-[0_0_20px_rgba(162,89,255,0.8)]
      active:bg-[#5C3696]
      border border-[#a259ff40]
    `,
    secondary: `
      bg-[#a259ff]
      text-white
      ${glow ? 'shadow-[0_0_15px_rgba(162,89,255,0.7)]' : 'shadow-md'}
      hover:bg-[#b57aff]
      hover:shadow-[0_0_20px_rgba(162,89,255,0.8)]
      active:bg-[#9340ff]
      border border-[#a259ff80]
    `,
    outline: `
      bg-transparent
      border
      border-[#a259ff]
      text-[#a259ff]
      ${glow ? 'shadow-[0_0_10px_rgba(162,89,255,0.5)]' : ''}
      hover:bg-[#a259ff20]
      hover:shadow-[0_0_15px_rgba(162,89,255,0.6)]
      active:bg-[#a259ff30]
    `,
    text: `
      bg-transparent
      text-[#a259ff]
      hover:bg-[#a259ff10]
      active:bg-[#a259ff20]
    `,
    glow: `
      bg-[#381c5b]
      text-white
      shadow-[0_0_15px_rgba(162,89,255,0.7)]
      hover:bg-[#4B2A77]
      hover:shadow-[0_0_25px_rgba(162,89,255,1)]
      active:bg-[#5C3696]
      border border-[#a259ff]
      animate-glow
    `,
  };

  // Combine all styles
  const buttonStyles = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `;

  return (
    <button
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;