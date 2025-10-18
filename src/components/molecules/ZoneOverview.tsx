import React from 'react';
import { ZoneData } from '@/types/dashboard';
import { Card } from '@/components/atoms/Card';
import { Typography } from '@/components/atoms/Typography';
import { cn, getVarianceColor } from '@/utils/helpers';

interface ZoneOverviewProps {
  zones: ZoneData[];
  className?: string;
}

export function ZoneOverview({ zones, className }: ZoneOverviewProps) {
  return (
    <Card className={cn('', className)}>
      <Typography variant="h6" className="mb-4">
        Zone Overview
      </Typography>
      
      <div className="space-y-3">
        {zones.map((zone) => (
          <div key={zone.name} className="flex items-center justify-between py-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <Typography variant="body1" color="primary" className="font-medium">
                {zone.name}
              </Typography>
              <Typography variant="body2" color="secondary">
                {zone.projects} Project{zone.projects !== 1 ? 's' : ''}
              </Typography>
            </div>
            
            <Typography 
              variant="body1" 
              className={cn('font-medium', getVarianceColor(zone.isPositive))}
            >
              {zone.percentage}
            </Typography>
          </div>
        ))}
      </div>
    </Card>
  );
}
