import React, { useState } from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Card } from '@/components/atoms/Card';
import { MultiSelectDropdown } from '@/components/molecules/MultiSelectDropdown';
import { MetricCard } from '@/components/molecules/MetricCard';
import { ProductionChart } from '@/components/molecules/ProductionChart';
import { ZoneOverview } from '@/components/molecules/ZoneOverview';
import { TabNavigation } from '@/components/molecules/TabNavigation';
import { projectsData, getProjectData } from '@/data/dashboardData';
import { Project } from '@/types/dashboard';
import { cn } from '@/utils/helpers';

interface ProjectOverviewPageProps {
  className?: string;
}

export function ProjectOverviewPage({ className }: ProjectOverviewPageProps) {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [currentPeriod, setCurrentPeriod] = useState('ytd');

  // Get dashboard data based on selected projects
  const dashboardData = getProjectData(projects, currentPeriod);

  const handleProjectChange = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
  };

  const handleTabChange = (tabId: string) => {
    setCurrentPeriod(tabId);
  };
  return (
    <div className={cn('p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6', className)}>
      {/* Header with project selector and tabs */}
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Typography variant="h3" className="font-bold text-center sm:text-left">
            Project Dashboard
          </Typography>
          
          {/* Project Multi-Select Dropdown */}
          <MultiSelectDropdown
            projects={projects}
            onChange={handleProjectChange}
            className="w-full sm:w-64"
          />
        </div>
        
        <TabNavigation 
          tabs={dashboardData.timePeriodTabs}
          onTabChange={handleTabChange}
          className="w-full sm:w-auto"
        />
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {dashboardData.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Charts and overview section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Production chart - takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <ProductionChart data={dashboardData.production} />
        </div>
        
        {/* Revenue variance and zone overview */}
        <div className="space-y-4 sm:space-y-6">
          <MetricCard metric={dashboardData.revenueVariance} />
          <ZoneOverview zones={dashboardData.zones} />
        </div>
      </div>
    </div>
  );
}
