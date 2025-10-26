import React from 'react';
import { UserProfile } from '@/types/dashboard';
import { Typography } from '@/components/atoms/Typography';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/utils/helpers';

interface HeaderProps {
  user: UserProfile;
  className?: string;
  onMenuToggle?: () => void;
  sidebarOpen?: boolean;
  currentPage?: 'company' | 'project';
  onPageChange?: (page: 'company' | 'project') => void;
}

export function Header({ 
  user, 
  className, 
  onMenuToggle, 
  sidebarOpen = false,
  currentPage = 'company',
  onPageChange 
}: HeaderProps) {
  return (
    <header className={cn('fixed top-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300', className)}>
      <div className="px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left side - Menu button + Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="secondary"
                size="sm"
                onClick={onMenuToggle}
                className="p-1.5 text-xs"
                aria-label={sidebarOpen ? "Close menu" : "Open menu"}
              >
                <span className="text-base">{sidebarOpen ? '✕' : '☰'}</span>
              </Button>
            </div>
            
            <Typography variant="h1" className="font-bold text-lg sm:text-xl">
              KlarityIQ
            </Typography>
          </div>

          {/* Center - Navigation tabs (hidden on mobile, shown as dropdown) */}
          <div className="hidden md:flex items-center gap-1">
            <Button 
              variant="tab" 
              size="sm" 
              isActive={currentPage === 'company'}
              onClick={() => onPageChange?.('company')}
            >
              Company Overview
            </Button>
            <Button 
              variant="tab" 
              size="sm" 
              isActive={currentPage === 'project'}
              onClick={() => onPageChange?.('project')}
            >
              Project Overview
            </Button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-300">
                <span className="text-xs sm:text-sm">{user.avatar}</span>
              </div>
              <div className="hidden sm:block">
                <Typography variant="body2" color="primary" className="font-medium">
                  {user.name}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
