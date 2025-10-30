"use client";

import React, { useMemo, useState } from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/utils/helpers';
import { transactions, projectsList, Transaction, TransactionType, TransactionStatus } from '@/data/accountingData';

export function AccountingPage({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<'buy-sell' | 'meter-data'>('buy-sell');
  const [selectedProject, setSelectedProject] = useState<string>('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    showAmount: false,
    showRate: false
  });
  const [appliedFilters, setAppliedFilters] = useState({
    showAmount: false,
    showRate: false
  });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const itemsPerPage = 7;

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
    setShowCalendar(false);
  };

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
    setShowFilter(false);
  };

  const handleFilterChange = (key: 'showAmount' | 'showRate') => {
    setFilterOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filterOptions });
    setShowFilter(false);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilterOptions({ showAmount: false, showRate: false });
    setAppliedFilters({ showAmount: false, showRate: false });
    setStartDate('');
    setEndDate('');
    setShowFilter(false);
    setShowCalendar(false);
    setCurrentPage(1);
  };

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t =>
        t.date.includes(query) ||
        t.transactionType.toLowerCase().includes(query) ||
        t.status.toLowerCase().includes(query) ||
        t.amount.toString().includes(query) ||
        t.rate.toString().includes(query) ||
        t.total.toString().includes(query)
      );
    }

    // Filter by date range
    if (startDate) {
      filtered = filtered.filter(t => t.date >= startDate);
    }
    if (endDate) {
      filtered = filtered.filter(t => t.date <= endDate);
    }

    // Filter by amount (show only transactions with amount > 5000)
    if (appliedFilters.showAmount) {
      filtered = filtered.filter(t => t.amount > 5000);
    }

    // Filter by rate (show only transactions with rate > 0.10)
    if (appliedFilters.showRate) {
      filtered = filtered.filter(t => t.rate > 0.10);
    }

    return filtered;
  }, [searchQuery, startDate, endDate, appliedFilters]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString('en-US');
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Transaction Type', 'Amount (KWH)', 'Rate ($/KWH)', 'Total ($)', 'Status'];
    const rows = transactions.map(t => [
      t.date,
      t.transactionType,
      t.amount.toString(),
      t.rate.toString(),
      t.total.toString(),
      t.status
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accounting-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const statusColors = {
    completed: 'bg-gray-100 text-gray-800',
    pending: 'bg-gray-100 text-gray-800',
    failed: 'bg-red-100 text-red-800'
  };

  return (
    <div className={cn('p-3 sm:p-6 lg:p-8', className)}>
      {/* Header with title and project filter */}
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h3" className="font-bold">Project Accounting</Typography>
        
        <div className="relative">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-4 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            {projectsList.map(project => (
              <option key={project} value={project}>{project}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <Card padding="lg" shadow="sm">
        {/* Combined Tabs and Action Bar in one row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-24 gap-6 mb-6">
          {/* Tabs */}
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="tab"
              isActive={activeTab === 'buy-sell'}
              onClick={() => setActiveTab('buy-sell')}
            >
              Buy/Sell Power
            </Button>
            <Button
              variant="tab"
              isActive={activeTab === 'meter-data'}
              onClick={() => setActiveTab('meter-data')}
            >
              Meter Data
            </Button>
          </div>

          {/* Action Bar */}
          <div className="flex gap-2 flex-1 items-center">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button 
              onClick={handleFilterClick}
              className={cn(
                "px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center",
                showFilter && "bg-blue-50 dark:bg-blue-900/30 border-blue-500"
              )}
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            
            <div className="relative">
              <button 
                onClick={handleCalendarClick}
                className={cn(
                  "px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center",
                  (startDate || endDate) && "bg-blue-50 dark:bg-blue-900/30 border-blue-500"
                )}
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              
              {/* Date Range Picker */}
              {showCalendar && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 p-4">
                  <Typography variant="subtitle1" className="font-semibold mb-3">Select Date Range</Typography>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="primary" onClick={() => { setShowCalendar(false); setCurrentPage(1); }} className="flex-1">
                        Apply
                      </Button>
                      <Button variant="secondary" onClick={clearFilters} className="flex-1">
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={exportToCSV}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filter Dropdown */}
        {showFilter && (
          <div className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <Typography variant="subtitle1" className="font-semibold mb-3">Filter Options</Typography>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterOptions.showAmount}
                  onChange={() => handleFilterChange('showAmount')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Amount (&gt; 5000 KWH)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterOptions.showRate}
                  onChange={() => handleFilterChange('showRate')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Rate (&gt; $0.10/KWH)</span>
              </label>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="primary" onClick={applyFilters} className="flex-1">
                Apply Filter
              </Button>
              <Button variant="secondary" onClick={clearFilters} className="flex-1">
                Clear
              </Button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 px-4 text-left">DATE</th>
                <th className="py-3 px-4 text-left">TRANSACTION TYPE</th>
                <th className="py-3 px-4 text-left">AMOUNT (KWH)</th>
                <th className="py-3 px-4 text-left">RATE ($/KWH)</th>
                <th className="py-3 px-4 text-left">TOTAL ($)</th>
                <th className="py-3 px-4 text-left">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-200">{transaction.date}</td>
                  <td className="py-3 px-4">
                    <span className={cn(
                      'inline-flex px-3 py-1 rounded-full text-xs font-medium',
                      transaction.transactionType === 'Sell' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    )}>
                      {transaction.transactionType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-200">{formatNumber(transaction.amount)}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-200">${transaction.rate.toFixed(2)}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-200 font-medium">{formatCurrency(transaction.total)}</td>
                  <td className="py-3 px-4">
                    <span className={cn('inline-flex px-3 py-1 rounded-full text-xs font-medium', statusColors[transaction.status])}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col lg:flex-row items-center justify-between mt-6">
          <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} results
          </Typography>
          
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={cn(
                'px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm font-medium transition-colors',
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              )}
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
              const pageNum = totalPages <= 3 ? i + 1 : 
                currentPage === 1 ? i + 1 :
                currentPage === totalPages ? totalPages - 2 + i :
                currentPage - 1 + i;
              
              if (pageNum > totalPages || pageNum < 1) return null;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={cn(
                    'px-3 py-2 rounded-md border text-sm font-medium transition-colors',
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={cn(
                'px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm font-medium transition-colors',
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              )}
            >
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AccountingPage;

