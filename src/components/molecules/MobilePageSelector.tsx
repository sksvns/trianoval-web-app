import React from 'react';
import { cn } from '@/utils/helpers';

interface MobilePageSelectorProps {
  currentPage: 'company' | 'project' | 'settings' | 'support' | 'anomaly' | 'accounting' | 'forecasting';
  onPageChange: (page: 'company' | 'project' | 'settings' | 'support' | 'anomaly' | 'accounting' | 'forecasting') => void;
  className?: string;
}

export function MobilePageSelector({ 
  currentPage, 
  onPageChange, 
  className 
}: MobilePageSelectorProps) {
  return (
    <div className={cn('md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300', className)}>
      <div className="px-3 sm:px-6 py-3">
        <select 
          value={currentPage}
          onChange={(e) => onPageChange(e.target.value as 'company' | 'project' | 'settings' | 'support' | 'anomaly' | 'accounting' | 'forecasting')}
          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
        >
          <option value="company" className="dark:bg-gray-700">Company Overview</option>
          <option value="project" className="dark:bg-gray-700">Project Overview</option>
        </select>
      </div>
    </div>
  );
}
