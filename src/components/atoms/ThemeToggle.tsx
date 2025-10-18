import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils/helpers';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center h-8 rounded-full w-14 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105',
        isDark 
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg' 
          : 'bg-gradient-to-r from-yellow-400 to-orange-400 shadow-md'
      )}
      aria-label="Toggle theme"
      role="switch"
      aria-checked={isDark}
    >
      {/* Background glow effect */}
      <div
        className={cn(
          'absolute inset-0 rounded-full transition-opacity duration-300',
          isDark 
            ? 'bg-blue-500/20 opacity-100' 
            : 'bg-yellow-300/20 opacity-100'
        )}
      />
      
      {/* Slider thumb */}
      <span
        className={cn(
          'relative inline-flex items-center justify-center w-6 h-6 transform rounded-full bg-white transition-all duration-300 ease-in-out shadow-lg border-2',
          isDark 
            ? 'translate-x-7 border-blue-200' 
            : 'translate-x-1 border-yellow-200'
        )}
      >
        {/* Icon inside thumb */}
        <span className="text-xs">
          {isDark ? '🌙' : '☀️'}
        </span>
      </span>
      
      {/* Background icons */}
      <span
        className={cn(
          'absolute left-2 top-1/2 transform -translate-y-1/2 text-xs transition-all duration-300',
          isDark ? 'opacity-30 scale-75' : 'opacity-0 scale-50'
        )}
      >
        ☀️
      </span>
      <span
        className={cn(
          'absolute right-2 top-1/2 transform -translate-y-1/2 text-xs transition-all duration-300',
          isDark ? 'opacity-0 scale-50' : 'opacity-30 scale-75'
        )}
      >
        🌙
      </span>
    </button>
  );
}
