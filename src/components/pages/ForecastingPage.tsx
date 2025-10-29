"use client";

import React, { useState } from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Card } from '@/components/atoms/Card';
import { cn } from '@/utils/helpers';
import { forecastData, forecastMetrics, timeRangeOptions } from '@/data/forecastingData';

export function ForecastingPage({ className }: { className?: string }) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('Next 12 Months');

  const formatCurrency = (value: string) => {
    return value;
  };

  const formatPower = (value: string) => {
    return value;
  };

  return (
    <div className={cn('p-3 sm:p-6 lg:p-8', className)}>
      {/* Header with title and time range selector */}
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h3" className="font-bold">Company Forecasting</Typography>
        
        <div className="relative">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            {timeRangeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Forecasted Revenue Card */}
        <Card padding="lg" shadow="sm">
          <div className="flex items-start justify-between">
            <div>
              <Typography variant="subtitle1" className="text-gray-600 dark:text-gray-400 mb-2">
                Forecasted Revenue
              </Typography>
              <Typography variant="h4" className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                {formatCurrency(forecastMetrics.forecastedRevenue.value)}
              </Typography>
              <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
                {forecastMetrics.forecastedRevenue.period}
              </Typography>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </Card>

        {/* Forecasted Power Generation Card */}
        <Card padding="lg" shadow="sm">
          <div className="flex items-start justify-between">
            <div>
              <Typography variant="subtitle1" className="text-gray-600 dark:text-gray-400 mb-2">
                Forecasted Power Generation
              </Typography>
              <Typography variant="h4" className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                {formatPower(forecastMetrics.forecastedPowerGeneration.value)}
              </Typography>
              <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
                {forecastMetrics.forecastedPowerGeneration.period}
              </Typography>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      {/* Chart Card */}
      <Card padding="lg" shadow="sm">
        <Typography variant="h6" className="font-semibold mb-4">12-Month Production Forecast (MWh)</Typography>
        
        {/* Chart Legend */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">Actual</Typography>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">GHI</Typography>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">Baseline</Typography>
          </div>
        </div>
        {/* Chart area with internal axis and padding */}
        <div className="relative h-80 pl-12 pr-6 pb-4 overflow-hidden">
          {/* Y-axis labels inside the chart */}
          <div className="absolute left-0 top-0 h-64 mt-4 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 select-none">
            <span>2500</span>
            <span>2000</span>
            <span>1500</span>
            <span>1000</span>
            <span>500</span>
            <span>0</span>
          </div>

          {/* Bars grid */}
          <div className="absolute inset-0 pt-4 px-2">
            <div className="h-full flex items-end justify-around gap-2">
              {forecastData.map((data) => {
                const maxValue = Math.max(...forecastData.map(d => Math.max(d.actual, d.ghi, d.baseline)));
                const actualHeight = (data.actual / maxValue) * 100;
                const ghiHeight = (data.ghi / maxValue) * 100;
                const baselineHeight = (data.baseline / maxValue) * 100;

                return (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2 min-w-0">
                    {/* Bars */}
                    <div className="flex items-end gap-1 h-64 w-full justify-center">
                      {/* Actual Bar */}
                      <div className="flex flex-col items-center">
                        <div 
                          className="w-3 sm:w-3.5 md:w-4 bg-blue-500 rounded-t"
                          style={{ height: `${actualHeight}%` }}
                        ></div>
                      </div>
                      
                      {/* GHI Bar */}
                      <div className="flex flex-col items-center">
                        <div 
                          className="w-3 sm:w-3.5 md:w-4 bg-green-500 rounded-t"
                          style={{ height: `${ghiHeight}%` }}
                        ></div>
                      </div>
                      
                      {/* Baseline Bar */}
                      <div className="flex flex-col items-center">
                        <div 
                          className="w-3 sm:w-3.5 md:w-4 bg-gray-500 rounded-t"
                          style={{ height: `${baselineHeight}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Month Label */}
                    <Typography variant="body2" className="text-gray-600 dark:text-gray-400 text-center truncate w-full">
                      {data.month}
                    </Typography>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ForecastingPage;

