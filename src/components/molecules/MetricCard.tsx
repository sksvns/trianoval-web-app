import React from 'react';
import { MetricCard as MetricCardType } from '@/types/dashboard';
import { Card } from '@/components/atoms/Card';
import { Typography } from '@/components/atoms/Typography';
import { cn, getVarianceColor } from '@/utils/helpers';

interface MetricCardProps {
  metric: MetricCardType;
  className?: string;
}

export function MetricCard({ metric, className }: MetricCardProps) {
  const { title, value, percentage, isPositive, subtitle, description, asOf } = metric;

  return (
    <Card className={cn(' flex flex-col', className)}>
      <div className="flex-1">
        <Typography variant="body2" color="secondary" className="mb-3">
          {title}
        </Typography>
        
        <div className="flex items-baseline gap-2 mb-2">
          <Typography 
            variant="h4" 
            color={percentage ? (isPositive ? 'success' : 'error') : 'primary'}
            className="font-bold"
          >
            {value}
          </Typography>
          
          {percentage && (
            <Typography 
              variant="body2" 
              className={cn('font-medium', getVarianceColor(isPositive))}
            >
              {percentage}
            </Typography>
          )}
        </div>

        {subtitle && (
          <Typography variant="body2" color="secondary" className="block mb-2">
            {subtitle}
          </Typography>
        )}

        {description && (
          <Typography variant="body2" color="secondary" className="block">
            {description}
          </Typography>
        )}
      </div>

      {asOf && (
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <Typography variant="body2" color="secondary">
            {asOf}
          </Typography>
        </div>
      )}
    </Card>
  );
}
