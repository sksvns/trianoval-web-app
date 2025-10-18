import React from 'react';
import { cn } from '@/utils/helpers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'tab';
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  isActive = false,
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700',
    tab: `px-4 py-2.5 text-base font-medium rounded-lg ${isActive 
      ? 'bg-blue-600 text-white' 
      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700'
    }`
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-md', // Increased padding and kept text-sm
    md: 'px-4 py-2.5 text-base rounded-lg', // Increased padding and font size
    lg: 'px-6 py-3 text-lg rounded-lg' // Increased font size from base to lg
  };

  return (
    <button
      className={cn(
        baseClasses,
        variant !== 'tab' && variantClasses[variant],
        variant === 'tab' ? variantClasses.tab : sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
