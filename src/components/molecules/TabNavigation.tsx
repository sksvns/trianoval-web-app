import React from 'react';
import { TabOption } from '@/types/dashboard';
import { Button } from '@/components/atoms/Button';

interface TabNavigationProps {
  tabs: TabOption[];
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function TabNavigation({ tabs, onTabChange, className }: TabNavigationProps) {
  return (
    <div className={`flex gap-1 p-1 bg-gray-100 rounded-lg dark:bg-gray-700 ${className || ''}`}>
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="tab"
          size="sm"
          isActive={tab.isActive}
          onClick={() => onTabChange(tab.id)}
          className="flex-1 text-sm sm:text-base px-2 sm:px-4 py-1.5 sm:py-2"
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
