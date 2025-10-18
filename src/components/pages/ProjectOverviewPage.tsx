import React from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Card } from '@/components/atoms/Card';
import { cn } from '@/utils/helpers';

interface ProjectOverviewPageProps {
  className?: string;
}

export function ProjectOverviewPage({ className }: ProjectOverviewPageProps) {
  return (
    <div className={cn('p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6', className)}>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <Typography variant="h3" className="font-bold text-center sm:text-left">
          Project Dashboard
        </Typography>
      </div>

      {/* Coming Soon Message */}
      <Card className="p-6 sm:p-8 text-center">
        <div className="space-y-4">
          <div className="text-4xl sm:text-6xl">🚧</div>
          <Typography variant="h4" className="font-semibold">
            Project Overview
          </Typography>
          <Typography variant="body1" color="secondary" className="max-w-md mx-auto">
            The project overview dashboard is currently under development. 
            Check back soon for detailed project metrics and insights.
          </Typography>
        </div>
      </Card>

      {/* Placeholder Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="p-4 sm:p-6">
          <div className="space-y-3">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <Typography variant="h6" className="font-semibold">
              Project Metrics
            </Typography>
            <Typography variant="body2" color="secondary">
              Performance indicators for individual projects
            </Typography>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="space-y-3">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <Typography variant="h6" className="font-semibold">
              Resource Allocation
            </Typography>
            <Typography variant="body2" color="secondary">
              Track resource usage across projects
            </Typography>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="space-y-3">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <Typography variant="h6" className="font-semibold">
              Timeline & Milestones
            </Typography>
            <Typography variant="body2" color="secondary">
              Project progress and upcoming deadlines
            </Typography>
          </div>
        </Card>
      </div>
    </div>
  );
}
