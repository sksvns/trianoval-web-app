'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { dashboardData, sidebarMenuItems, userProfile, getDataForPeriod } from '@/data/dashboardData';
import { TabOption, SidebarMenuItem } from '@/types/dashboard';

export function CompanyOverviewPage() {
  const [currentData, setCurrentData] = useState(dashboardData);
  const [menuItems, setMenuItems] = useState(sidebarMenuItems);

  const handleTabChange = (tabId: string) => {
    // Get updated data for the selected period
    const updatedData = getDataForPeriod(tabId);
    setCurrentData(updatedData);

    // Log for development
    console.log(`Switching to time period: ${tabId}`);
  };

  const handleMenuItemClick = (itemId: string) => {
    const updatedMenuItems = menuItems.map(item => ({
      ...item,
      isActive: item.id === itemId
    }));

    setMenuItems(updatedMenuItems);

    // Here you would typically navigate to different pages/sections
    console.log(`Menu item clicked: ${itemId}`);
  };

  return (
    <DashboardLayout
      dashboardData={currentData}
      sidebarItems={menuItems}
      user={userProfile}
      onTabChange={handleTabChange}
      onMenuItemClick={handleMenuItemClick}
    />
  );
}
