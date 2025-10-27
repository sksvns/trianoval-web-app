'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { dashboardData, sidebarMenuItems, userProfile, getDataForPeriod } from '@/data/dashboardData';
import { TabOption, SidebarMenuItem } from '@/types/dashboard';

export function CompanyOverviewPage() {
  const [currentData, setCurrentData] = useState(dashboardData);
  const [menuItems, setMenuItems] = useState(sidebarMenuItems);
  const [activeView, setActiveView] = useState<'company' | 'project' | 'settings' | 'support' | 'anomaly' | 'accounting'>('company');

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

  // Switch the main view when settings, support, anomaly, or accounting is clicked
  if (itemId === 'settings') setActiveView('settings');
  else if (itemId === 'support') setActiveView('support');
  else if (itemId === 'anomaly') setActiveView('anomaly');
  else if (itemId === 'accounting') setActiveView('accounting');
  else if (itemId === 'dashboard') setActiveView('company');
  else setActiveView('company');

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
      activeView={activeView}
      onViewChange={(v) => setActiveView(v)}
    />
  );
}
