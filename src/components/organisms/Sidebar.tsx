import React from 'react';
import { SidebarMenuItem } from '@/types/dashboard';
import { Typography } from '@/components/atoms/Typography';
import { SidebarMenu } from '@/components/molecules/SidebarMenu';
import { cn } from '@/utils/helpers';

interface SidebarProps {
  menuItems: SidebarMenuItem[];
  onMenuItemClick: (itemId: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export function Sidebar({ 
  menuItems, 
  onMenuItemClick, 
  isOpen = true, 
  onClose,
  className 
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] md:relative md:top-0 md:h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-all duration-300 md:transform-none md:z-auto md:block overflow-hidden z-10',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile header with back button */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <Typography variant="h6" className="font-semibold">
              Menu
            </Typography>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close menu"
            >
              <span className="text-xl">←</span>
            </button>
          </div>
          
          {/* Logo/Brand - Desktop only */}
          {/* <div className="hidden md:block p-4 border-b border-gray-200 dark:border-gray-700">
            <Typography variant="h6" className="font-bold text-blue-600 dark:text-blue-400">
              KlarityIQ
            </Typography>
          </div> */}
          
          {/* Menu */}
          <div className="flex-1 p-3 sm:p-4">
            <SidebarMenu 
              items={menuItems} 
              onItemClick={onMenuItemClick}
            />
          </div>
          
          {/* Support at bottom - sticky */}
          <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <button
              onClick={() => onMenuItemClick('support')}
              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700"
            >
              <span className="text-lg sm:text-xl">💬</span>
              <Typography variant="body1" color="secondary" className="font-medium">
                Support
              </Typography>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
