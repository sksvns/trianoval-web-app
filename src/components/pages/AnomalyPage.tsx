"use client";

import React, { useMemo, useState } from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Card } from '@/components/atoms/Card';
import { cn } from '@/utils/helpers';
import { outages, projectsList, groupByOptions, filterByOptions, Outage } from '@/data/anomalyData';

export function AnomalyPage({ className }: { className?: string }) {
  const [selectedProject, setSelectedProject] = useState<string>('All Projects');
  const [timeRange, setTimeRange] = useState<string>('YTD');
  const [groupBy, setGroupBy] = useState<string>('Status');
  const [filterBy, setFilterBy] = useState<string>('All');
  const [selectedOutageId, setSelectedOutageId] = useState<string | null>(null);

  const filteredOutages = useMemo(() => {
    let filtered = outages;

    // Filter by project
    if (selectedProject !== 'All Projects') {
      filtered = filtered.filter(o => o.project === selectedProject);
    }

    // Filter by status
    if (filterBy === 'Active Only') {
      filtered = filtered.filter(o => o.status === 'Active' || o.status === 'Need Immediate Action');
    } else if (filterBy === 'Resolved') {
      filtered = filtered.filter(o => o.status === 'Resolved');
    }

    return filtered;
  }, [selectedProject, filterBy]);

  const categoryColors = {
    Hardware: 'bg-blue-100 text-blue-800',
    Software: 'bg-purple-100 text-purple-800',
    External: 'bg-gray-100 text-gray-800',
    Planned: 'bg-gray-100 text-gray-800'
  };

  const statusColors = {
    'Need Immediate Action': 'bg-red-100 text-red-800',
    'Active': 'bg-gray-100 text-gray-800',
    'Resolved': 'bg-gray-100 text-gray-800',
    'Pending': 'bg-gray-100 text-gray-800'
  };

  return (
    <div className={cn('p-3 sm:p-6 lg:p-8', className)}>
      <div className='flex items-center justify-between'>
      <Typography variant="h3" className="font-bold mb-6">Anomaly: Outages</Typography>

{/* Global Filters */}
<div className="flex flex-col sm:flex-row gap-4 mb-6">
  <div className="relative">
    <select
      value={selectedProject}
      onChange={(e) => setSelectedProject(e.target.value)}
      className="px-4 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
    >
      <option>All Projects</option>
      {projectsList.map(project => (
        <option key={project} value={project}>{project}</option>
      ))}
    </select>
    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>

  <div className="flex gap-2">
    {['1W', 'MTD', 'QTD', 'YTD'].map((range) => (
      <button
        key={range}
        onClick={() => setTimeRange(range)}
        className={cn(
          'px-4 py-2 rounded-md font-medium transition-colors',
          timeRange === range
            ? 'bg-blue-600 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
        )}
      >
        {range}
      </button>
    ))}
  </div>
</div>
      </div>

      {/* Outage Details Card */}
      <Card padding="lg" shadow="sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <Typography variant="h5" className="font-semibold">Outage Details</Typography>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Group by:</span>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="px-3 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                {groupByOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className="relative">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Filter by:</span>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-3 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                {filterByOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Outage Details Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 px-4 font-medium">PROJECT</th>
                <th className="py-3 px-4 font-medium">REASON FOR OUTAGE</th>
                <th className="py-3 px-4 font-medium">CATEGORY</th>
                <th className="py-3 px-4 font-medium">STATUS</th>
                <th className="py-3 px-4 font-medium">START DATE</th>
                <th className="py-3 px-4 font-medium">END DATE</th>
              </tr>
            </thead>
            <tbody>
              {filteredOutages.map((outage) => (
                <tr
                  key={outage.id}
                  onClick={() => setSelectedOutageId(outage.id)}
                  className={cn(
                    'border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors',
                    selectedOutageId === outage.id ? 'bg-blue-50 dark:bg-blue-900/30' : '',
                    outage.status === 'Need Immediate Action' ? 'bg-red-50 dark:bg-red-900/10' : ''
                  )}
                >
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-200 font-medium">{outage.project}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{outage.reason}</td>
                  <td className="py-3 px-4">
                    <span className={cn('inline-flex px-3 py-1 rounded-full text-xs font-medium', categoryColors[outage.category])}>
                      {outage.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={cn('inline-flex px-3 py-1 rounded-full text-xs font-medium', statusColors[outage.status])}>
                      {outage.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{outage.startDate}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{outage.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default AnomalyPage;

