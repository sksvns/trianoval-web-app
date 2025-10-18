import React from 'react';
import { SidebarMenuItem } from '@/types/dashboard';
import { Typography } from '@/components/atoms/Typography';
import { cn } from '@/utils/helpers';

interface SidebarMenuProps {
  items: SidebarMenuItem[];
  onItemClick: (itemId: string) => void;
  className?: string;
}

export function SidebarMenu({ items, onItemClick, className }: SidebarMenuProps) {
  return (
    <nav className={cn('space-y-3 pt-4 md:pt-8', className)}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick(item.id)}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200',
            item.isActive
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700'
          )}
        >
          <span className="text-xl">{item.icon}</span>
          <Typography 
            variant="body1" 
            className={cn(
              'font-medium',
              item.isActive ? 'text-white' : ''
            )}
          >
            {item.label}
          </Typography>
        </button>
      ))}
    </nav>
  );
}
