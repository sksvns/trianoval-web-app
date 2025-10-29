import React, { useState } from 'react';
import { DashboardData, SidebarMenuItem, UserProfile } from '@/types/dashboard';
import { Header } from '@/components/organisms/Header';
import { Sidebar } from '@/components/organisms/Sidebar';
import { DashboardContent } from '@/components/organisms/DashboardContent';
import { ProjectOverviewPage } from '@/components/pages/ProjectOverviewPage';
import { SettingsPage } from '@/components/pages/SettingsPage';
import { SupportPage } from '@/components/pages/SupportPage';
import { AnomalyPage } from '@/components/pages/AnomalyPage';
import { AccountingPage } from '@/components/pages/AccountingPage';
import { ForecastingPage } from '@/components/pages/ForecastingPage';
import { MobilePageSelector } from '@/components/molecules/MobilePageSelector';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/utils/helpers';

interface DashboardLayoutProps {
  dashboardData: DashboardData;
  sidebarItems: SidebarMenuItem[];
  user: UserProfile;
  onTabChange: (tabId: string) => void;
  onMenuItemClick: (itemId: string) => void;
  /** Optional controlled view: 'company' | 'project' | 'settings' | 'support' | 'anomaly' | 'accounting' | 'forecasting' */
  activeView?: 'company' | 'project' | 'settings' | 'support' | 'anomaly' | 'accounting' | 'forecasting';
  /** Optional callback when view changes (header tabs or other) */
  onViewChange?: (view: 'company' | 'project' | 'settings' | 'support' | 'anomaly' | 'accounting' | 'forecasting') => void;
}

export function DashboardLayout({
  dashboardData,
  sidebarItems,
  user,
  onTabChange,
  onMenuItemClick
  , activeView, onViewChange
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [internalPage, setInternalPage] = useState<'company' | 'project' | 'settings' | 'support' | 'anomaly' | 'accounting' | 'forecasting'>('company');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handlePageChange = (page: 'company' | 'project' | 'settings' | 'support' | 'anomaly' | 'accounting' | 'forecasting') => {
    // If parent controls activeView, notify it; otherwise update internal state
    if (onViewChange) onViewChange(page);
    else setInternalPage(page);
    console.log(`Navigating to ${page} overview`);
  };

  const handleMenuSelection = (itemId: string) => {
    // If the menu triggers a view change to settings or support, notify parent (if present)
    if (itemId === 'settings') {
      if (onViewChange) onViewChange('settings');
      else setInternalPage('settings');
    }
    if (itemId === 'support') {
      if (onViewChange) onViewChange('support');
      else setInternalPage('support');
    }
    if (itemId === 'anomaly') {
      if (onViewChange) onViewChange('anomaly');
      else setInternalPage('anomaly');
    }
    if (itemId === 'accounting') {
      if (onViewChange) onViewChange('accounting');
      else setInternalPage('accounting');
    }
    if (itemId === 'forecasting') {
      if (onViewChange) onViewChange('forecasting');
      else setInternalPage('forecasting');
    }
    // Always forward menu clicks to parent handler
    onMenuItemClick(itemId);
    setSidebarOpen(false);
  };

  const currentPage = activeView ?? internalPage;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      {/* Header - always full width */}
      <Header 
        user={user} 
        onMenuToggle={toggleSidebar}
        sidebarOpen={sidebarOpen}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      
      {/* Mobile page selector - below header on mobile only */}
      <MobilePageSelector
        currentPage={currentPage}
        onPageChange={handlePageChange}
        className="fixed top-14 sm:top-16 left-0 right-0 z-20"
      />
      
      {/* Main container with fixed height */}
      <div className="flex h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] md:h-screen md:pt-16">
        {/* Sidebar - fixed, no scrolling */}
          <Sidebar
            menuItems={sidebarItems}
            onMenuItemClick={handleMenuSelection}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

        {/* Main content area - only this scrolls */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Add top spacing on mobile for the page selector */}
          <div className="md:hidden h-12 sm:h-14"></div>
          <main className="flex-1 overflow-y-auto">
            {currentPage === 'company' ? (
              <DashboardContent 
                data={dashboardData}
                onTabChange={onTabChange}
              />
            ) : currentPage === 'project' ? (
              <ProjectOverviewPage />
            ) : currentPage === 'settings' ? (
              <SettingsPage />
            ) : currentPage === 'support' ? (
              <SupportPage />
            ) : currentPage === 'anomaly' ? (
              <AnomalyPage />
            ) : currentPage === 'accounting' ? (
              <AccountingPage />
            ) : currentPage === 'forecasting' ? (
              <ForecastingPage />
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}
