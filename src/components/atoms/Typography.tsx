import React from 'react';
import { cn } from '@/utils/helpers';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'subtitle1' | 'subtitle2';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  className?: string;
  children: React.ReactNode;
}

export function Typography({ 
  variant = 'body1', 
  color = 'primary', 
  className, 
  children 
}: TypographyProps) {
  const variantClasses = {
    h1: 'text-5xl font-bold leading-tight', // Increased from 4xl
    h2: 'text-4xl font-bold leading-tight', // Increased from 3xl
    h3: 'text-3xl font-semibold leading-tight', // Increased from 2xl
    h4: 'text-2xl font-semibold leading-snug', // Increased from xl
    h5: 'text-xl font-semibold leading-snug', // Increased from lg
    h6: 'text-lg font-semibold leading-normal', // Increased from base
    body1: 'text-lg leading-relaxed', // Increased from base (16px to 18px)
    body2: 'text-base leading-relaxed', // Increased from sm (14px to 16px)
    caption: 'text-sm leading-normal', // Increased from xs (12px to 14px)
    subtitle1: 'text-lg font-medium leading-relaxed', // Increased from base
    subtitle2: 'text-base font-medium leading-relaxed' // Increased from sm
  };
  
  const colorClasses = {
    primary: 'text-gray-900 dark:text-gray-100',
    secondary: 'text-gray-600 dark:text-gray-400',
    success: 'text-green-600 dark:text-green-400',
    error: 'text-red-600 dark:text-red-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    info: 'text-blue-600 dark:text-blue-400'
  };

  const getComponent = (variant: string) => {
    if (variant.startsWith('h')) {
      return variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    }
    return 'p';
  };

  const Component = getComponent(variant);

  return (
    <Component
      className={cn(
        variantClasses[variant],
        colorClasses[color],
        className
      )}
    >
      {children}
    </Component>
  );
}
