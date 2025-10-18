import React, { useState } from 'react';
import { DashboardData, SidebarMenuItem, UserProfile } from '@/types/dashboard';
import { Header } from '@/components/organisms/Header';
import { Sidebar } from '@/components/organisms/Sidebar';
import { DashboardContent } from '@/components/organisms/DashboardContent';
import { ProjectOverviewPage } from '@/components/pages/ProjectOverviewPage';
import { MobilePageSelector } from '@/components/molecules/MobilePageSelector';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/utils/helpers';

interface DashboardLayoutProps {
  dashboardData: DashboardData;
  sidebarItems: SidebarMenuItem[];
  user: UserProfile;
  onTabChange: (tabId: string) => void;
  onMenuItemClick: (itemId: string) => void;
}

export function DashboardLayout({
  dashboardData,
  sidebarItems,
  user,
  onTabChange,
  onMenuItemClick
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'company' | 'project'>('company');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handlePageChange = (page: 'company' | 'project') => {
    setCurrentPage(page);
    // Here you could add logic to load different data or navigate to different pages
    console.log(`Navigating to ${page} overview`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
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
      
      <div className="flex pt-14 sm:pt-16">
        {/* Sidebar - positioned below header on desktop, full height on mobile */}
        <Sidebar
          menuItems={sidebarItems}
          onMenuItemClick={(itemId) => {
            onMenuItemClick(itemId);
            setSidebarOpen(false); // Close sidebar after menu item click on mobile
          }}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content area */}
        <div className="flex-1 lg:ml-0">
          {/* Add top spacing on mobile for the page selector */}
          <div className="md:hidden h-12 sm:h-14"></div>
          <main className="overflow-y-auto">
            {currentPage === 'company' ? (
              <DashboardContent 
                data={dashboardData}
                onTabChange={onTabChange}
              />
            ) : (
              <ProjectOverviewPage />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
