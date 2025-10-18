import React from 'react';
import { DashboardData } from '@/types/dashboard';
import { Typography } from '@/components/atoms/Typography';
import { MetricCard } from '@/components/molecules/MetricCard';
import { TabNavigation } from '@/components/molecules/TabNavigation';
import { ProductionChart } from '@/components/molecules/ProductionChart';
import { ZoneOverview } from '@/components/molecules/ZoneOverview';
import { cn } from '@/utils/helpers';

interface DashboardContentProps {
  data: DashboardData;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function DashboardContent({ data, onTabChange, className }: DashboardContentProps) {
  return (
    <div className={cn('p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6', className)}>
      {/* Header with tabs */}
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Typography variant="h3" className="font-bold text-center sm:text-left">
          Company Dashboard
        </Typography>
        
        <TabNavigation 
          tabs={data.timePeriodTabs}
          onTabChange={onTabChange}
          className="w-full sm:w-auto"
        />
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Charts and overview section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Production chart - takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <ProductionChart data={data.production} />
        </div>
        
        {/* Revenue variance */}
        <div className="space-y-4 sm:space-y-6">
          <MetricCard metric={data.revenueVariance} />
          <ZoneOverview zones={data.zones} />
        </div>
      </div>
    </div>
  );
}
