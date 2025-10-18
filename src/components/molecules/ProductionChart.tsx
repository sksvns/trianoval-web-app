import React from 'react';
import { ProductionData, ChartDataPoint } from '@/types/dashboard';
import { Card } from '@/components/atoms/Card';
import { Typography } from '@/components/atoms/Typography';
import { cn } from '@/utils/helpers';

interface ProductionChartProps {
  data: ProductionData;
  className?: string;
}

interface BarChartProps {
  data: ChartDataPoint[];
  legendItems: { label: string; color: string; }[];
}

function BarChart({ data, legendItems }: BarChartProps) {
  // Find the maximum value for scaling
  const maxValue = Math.max(
    ...data.flatMap(d => [d.actual, d.baseline, d.ghiAdjustedBaseline])
  );
  
  // Ensure we have a reasonable minimum height for visibility
  const minBarHeight = 8; // minimum 8px height
  
  return (
    <div className="space-y-4">
      {/* Chart area */}
      <div className="relative h-80 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 pl-16 pb-12">
        {/* Y-axis labels */}
        <div className="absolute left-1 top-4 h-60 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{Math.round(maxValue)}</span>
          <span>{Math.round(maxValue * 0.8)}</span>
          <span>{Math.round(maxValue * 0.6)}</span>
          <span>{Math.round(maxValue * 0.4)}</span>
          <span>{Math.round(maxValue * 0.2)}</span>
          <span>0</span>
        </div>
        
        {/* Chart bars */}
        <div className="flex items-end justify-between h-60 space-x-2 ml-10">
          {data.map((point, index) => {
            // Calculate heights as percentage of chart area (240px = h-60)
            const actualHeight = Math.max(minBarHeight, (point.actual / maxValue) * 220);
            const baselineHeight = Math.max(minBarHeight, (point.baseline / maxValue) * 220);
            const ghiHeight = Math.max(minBarHeight, (point.ghiAdjustedBaseline / maxValue) * 220);
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                {/* Bars container */}
                <div className="flex items-end space-x-1 h-56 w-full justify-center">
                  {/* Actual bar */}
                  <div className="relative w-4">
                    <div 
                      className="bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600 cursor-pointer min-h-[2px]"
                      style={{ height: `${actualHeight}px` }}
                      title={`Actual: ${point.actual}`}
                    />
                  </div>
                  
                  {/* Baseline bar */}
                  <div className="relative w-4">
                    <div 
                      className="bg-gray-400 rounded-t transition-all duration-300 hover:bg-gray-500 cursor-pointer min-h-[2px]"
                      style={{ height: `${baselineHeight}px` }}
                      title={`Baseline: ${point.baseline}`}
                    />
                  </div>
                  
                  {/* GHI Adjusted bar */}
                  <div className="relative w-4">
                    <div 
                      className="bg-green-500 rounded-t transition-all duration-300 hover:bg-green-600 cursor-pointer min-h-[2px]"
                      style={{ height: `${ghiHeight}px` }}
                      title={`GHI Adjusted: ${point.ghiAdjustedBaseline}`}
                    />
                  </div>
                </div>
                
                {/* Period label - positioned below bars with more spacing */}
                <div className="mt-3">
                  <Typography variant="body2" color="secondary" className="text-xs text-center font-medium">
                    {point.period}
                  </Typography>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ProductionChart({ data, className }: ProductionChartProps) {
  // Use default chart data if none provided
  const defaultChartData = [
    { period: 'Q1', actual: 4950, baseline: 5350, ghiAdjustedBaseline: 5150 },
    { period: 'Q2', actual: 5280, baseline: 5600, ghiAdjustedBaseline: 5440 },
    { period: 'Q3', actual: 4890, baseline: 5250, ghiAdjustedBaseline: 5070 },
    { period: 'Q4', actual: 5042, baseline: 5400, ghiAdjustedBaseline: 5221 }
  ];

  const chartData = data.chartData || defaultChartData;

  return (
    <Card className={cn('', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <Typography variant="h6">
          {data.title}
        </Typography>
        
        <div className="flex flex-wrap gap-3">
          {data.legendItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <Typography variant="body2" color="secondary">
                {item.label}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <Typography variant="h2" color="primary" className="font-bold">
          {data.value} <span className="text-xl font-normal text-gray-600 dark:text-gray-400">{data.unit}</span>
        </Typography>
      </div>
      
      {/* Chart */}
      <div className="relative">
        <BarChart data={chartData} legendItems={data.legendItems} />
      </div>
    </Card>
  );
}
