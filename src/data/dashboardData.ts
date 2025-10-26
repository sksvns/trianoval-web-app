import { DashboardData, SidebarMenuItem, UserProfile, Project, ProjectData } from '@/types/dashboard';

// Project data
export const projectsData: Project[] = [
  { id: 'project-alpha', name: 'Project Alpha', status: 'active', location: 'North Zone', capacity: 25, isSelected: true },
  { id: 'project-beta', name: 'Project Beta', status: 'active', location: 'South Zone', capacity: 30, isSelected: true },
  { id: 'project-gamma', name: 'Project Gamma', status: 'active', location: 'West Zone', capacity: 20, isSelected: true },
  { id: 'project-delta', name: 'Project Delta', status: 'maintenance', location: 'East Zone', capacity: 15, isSelected: true },
  { id: 'project-epsilon', name: 'Project Epsilon', status: 'active', location: 'North Zone', capacity: 35, isSelected: true },
];

export const dashboardData: DashboardData = {
  metrics: [
    {
      id: 'raw-variance',
      title: 'Raw Variance YTD',
      value: '-43,852,609 kWh',
      percentage: '-86.0%',
      isPositive: false,
      subtitle: '(-86.0%)',
      description: 'Underwritten Baseline'
    },
    {
      id: 'ghi-adjusted',
      title: 'GHI Adjusted Variance YTD',
      value: '+79,644,740 kWh',
      percentage: '+2.6%',
      isPositive: true,
      subtitle: '(+2.6%) GHI Adjusted',
      description: 'Baseline'
    },
    {
      id: 'variance-30-days',
      title: 'Variance vs 30 Days',
      value: '-1.3%',
      percentage: '',
      isPositive: false,
      subtitle: 'Change in Raw Variance',
      asOf: 'As of 03-09-2025'
    },
    {
      id: 'availability',
      title: 'Availability',
      value: '--%',
      percentage: '',
      isPositive: true,
      asOf: 'As of 03-09-2025'
    }
  ],
  production: {
    title: 'Total Actual Production YTD',
    value: '20,162',
    unit: 'MWh',
    legendItems: [
      { label: 'Actual', color: '#3B82F6' },
      { label: 'Baseline', color: '#9CA3AF' },
      { label: 'GHI adjusted Baseline', color: '#10B981' }
    ]
  },
  revenueVariance: {
    id: 'revenue-variance',
    title: 'Revenue Variance YTD',
    value: '-$228,426',
    percentage: '',
    isPositive: false,
    description: 'Est. Net Revenue Compared to Baseline'
  },
  zones: [
    {
      name: 'North',
      projects: 5,
      percentage: '2.6%',
      isPositive: true
    },
    {
      name: 'South',
      projects: 3,
      percentage: '-1.2%',
      isPositive: false
    },
    {
      name: 'West',
      projects: 8,
      percentage: '0.8%',
      isPositive: true
    },
    {
      name: 'East',
      projects: 2,
      percentage: '-5.3%',
      isPositive: false
    }
  ],
  timePeriodTabs: [
    { id: '1w', label: '1W', isActive: false },
    { id: 'mtd', label: 'MTD', isActive: false },
    { id: 'qtd', label: 'QTD', isActive: false },
    { id: 'ytd', label: 'YTD', isActive: true }
  ]
};

export const sidebarMenuItems: SidebarMenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '⬛', isActive: true },
  { id: 'accounting', label: 'Accounting', icon: '📊', isActive: false },
  { id: 'anomaly', label: 'Anomaly', icon: '⚠️', isActive: false },
  { id: 'forecasting', label: 'Forecasting', icon: '📈', isActive: false },
  { id: 'settings', label: 'Settings', icon: '⚙️', isActive: false }
];

export const userProfile: UserProfile = {
  name: 'Admin User',
  avatar: '👤',
  role: 'Administrator'
};

// Function to get data for different periods with chart data based on variance values
export const getDataForPeriod = (periodId: string): DashboardData => {
  // Base chart data that changes based on the variance values from the cards
  const getChartDataForPeriod = (periodId: string) => {
    switch (periodId) {
      case '1w':
        return [
          { period: 'Mon', actual: 45, baseline: 90, ghiAdjustedBaseline: 48 },
          { period: 'Tue', actual: 42, baseline: 95, ghiAdjustedBaseline: 43 },
          { period: 'Wed', actual: 38, baseline: 85, ghiAdjustedBaseline: 42 },
          { period: 'Thu', actual: 48, baseline: 92, ghiAdjustedBaseline: 50 },
          { period: 'Fri', actual: 45, baseline: 98, ghiAdjustedBaseline: 56 },
          { period: 'Sat', actual: 52, baseline: 100, ghiAdjustedBaseline: 58 },
          { period: 'Sun', actual: 59, baseline: 94, ghiAdjustedBaseline: 61 }
        ];
      case 'mtd':
        return [
          { period: 'Week 1', actual: 420, baseline: 450, ghiAdjustedBaseline: 435 },
          { period: 'Week 2', actual: 380, baseline: 420, ghiAdjustedBaseline: 405 },
          { period: 'Week 3', actual: 460, baseline: 480, ghiAdjustedBaseline: 470 },
          { period: 'Week 4', actual: 390, baseline: 430, ghiAdjustedBaseline: 415 }
        ];
      case 'qtd':
        return [
          { period: 'Jan', actual: 1650, baseline: 1800, ghiAdjustedBaseline: 1725 },
          { period: 'Feb', actual: 1520, baseline: 1650, ghiAdjustedBaseline: 1585 },
          { period: 'Mar', actual: 1780, baseline: 1900, ghiAdjustedBaseline: 1840 }
        ];
      case 'ytd':
      default:
        return [
          { period: 'Q1', actual: 4950, baseline: 5350, ghiAdjustedBaseline: 5150 },
          { period: 'Q2', actual: 5280, baseline: 5600, ghiAdjustedBaseline: 5440 },
          { period: 'Q3', actual: 4890, baseline: 5250, ghiAdjustedBaseline: 5070 },
          { period: 'Q4', actual: 5042, baseline: 5400, ghiAdjustedBaseline: 5221 }
        ];
    }
  };

  const chartData = getChartDataForPeriod(periodId);
  const actualTotal = chartData.reduce((sum, point) => sum + point.actual, 0);
  const baselineTotal = chartData.reduce((sum, point) => sum + point.baseline, 0);
  const ghiAdjustedTotal = chartData.reduce((sum, point) => sum + point.ghiAdjustedBaseline, 0);
  
  // Calculate variances based on the chart data
  const rawVariance = ((actualTotal - baselineTotal) / baselineTotal * 100).toFixed(1);
  const ghiAdjustedVariance = ((actualTotal - ghiAdjustedTotal) / ghiAdjustedTotal * 100).toFixed(1);
  
  const periodLabels = {
    '1w': '1W',
    'mtd': 'MTD', 
    'qtd': 'QTD',
    'ytd': 'YTD'
  };
  
  const currentLabel = periodLabels[periodId as keyof typeof periodLabels] || 'YTD';
  
  return {
    ...dashboardData,
    metrics: [
      {
        ...dashboardData.metrics[0],
        title: `Raw Variance ${currentLabel}`,
        value: `${parseFloat(rawVariance) >= 0 ? '+' : ''}${Math.abs(baselineTotal - actualTotal).toLocaleString()} kWh`,
        percentage: `${rawVariance}%`,
        isPositive: parseFloat(rawVariance) >= 0,
        subtitle: `(${rawVariance}%)`,
      },
      {
        ...dashboardData.metrics[1],
        title: `GHI Adjusted Variance ${currentLabel}`,
        value: `${parseFloat(ghiAdjustedVariance) >= 0 ? '+' : ''}${Math.abs(ghiAdjustedTotal - actualTotal).toLocaleString()} kWh`,
        percentage: `${ghiAdjustedVariance}%`,
        isPositive: parseFloat(ghiAdjustedVariance) >= 0,
        subtitle: `(${ghiAdjustedVariance}%) GHI Adjusted`,
      },
      ...dashboardData.metrics.slice(2)
    ],
    production: {
      ...dashboardData.production,
      title: `Total Actual Production ${currentLabel}`,
      value: (actualTotal / 1000).toFixed(1),
      chartData
    },
    timePeriodTabs: dashboardData.timePeriodTabs.map(tab => ({
      ...tab,
      isActive: tab.id === periodId
    }))
  };
};

// Project-specific data generator
export const getProjectData = (selectedProjects: Project[], periodId: string = 'ytd'): ProjectData => {
  const selectedProjectIds = selectedProjects.filter(p => p.isSelected).map(p => p.id);
  const totalSelectedProjects = selectedProjectIds.length;
  const totalCapacity = selectedProjects.filter(p => p.isSelected).reduce((sum, p) => sum + p.capacity, 0);
  
  // Scale data based on selected projects (assuming 5 total projects)
  const scaleFactor = totalSelectedProjects / 5;
  
  // Generate project-specific chart data using the same logic as company data
  const getProjectChartData = (periodId: string) => {
    let baseData;
    switch (periodId) {
      case '1w':
        baseData = [
          { period: 'Mon', actual: 45, baseline: 90, ghiAdjustedBaseline: 48 },
          { period: 'Tue', actual: 42, baseline: 95, ghiAdjustedBaseline: 43 },
          { period: 'Wed', actual: 38, baseline: 85, ghiAdjustedBaseline: 42 },
          { period: 'Thu', actual: 48, baseline: 92, ghiAdjustedBaseline: 50 },
          { period: 'Fri', actual: 45, baseline: 98, ghiAdjustedBaseline: 56 },
          { period: 'Sat', actual: 52, baseline: 100, ghiAdjustedBaseline: 58 },
          { period: 'Sun', actual: 59, baseline: 94, ghiAdjustedBaseline: 61 }
        ];
        break;
      case 'mtd':
        baseData = [
          { period: 'Week 1', actual: 420, baseline: 450, ghiAdjustedBaseline: 435 },
          { period: 'Week 2', actual: 380, baseline: 420, ghiAdjustedBaseline: 405 },
          { period: 'Week 3', actual: 460, baseline: 480, ghiAdjustedBaseline: 470 },
          { period: 'Week 4', actual: 390, baseline: 430, ghiAdjustedBaseline: 415 }
        ];
        break;
      case 'qtd':
        baseData = [
          { period: 'Jan', actual: 1650, baseline: 1800, ghiAdjustedBaseline: 1725 },
          { period: 'Feb', actual: 1520, baseline: 1650, ghiAdjustedBaseline: 1585 },
          { period: 'Mar', actual: 1780, baseline: 1900, ghiAdjustedBaseline: 1840 }
        ];
        break;
      case 'ytd':
      default:
        baseData = [
          { period: 'Q1', actual: 4950, baseline: 5350, ghiAdjustedBaseline: 5150 },
          { period: 'Q2', actual: 5280, baseline: 5600, ghiAdjustedBaseline: 5440 },
          { period: 'Q3', actual: 4890, baseline: 5250, ghiAdjustedBaseline: 5070 },
          { period: 'Q4', actual: 5042, baseline: 5400, ghiAdjustedBaseline: 5221 }
        ];
        break;
    }
    
    return baseData.map(point => ({
      ...point,
      actual: Math.round(point.actual * scaleFactor),
      baseline: Math.round(point.baseline * scaleFactor),
      ghiAdjustedBaseline: Math.round(point.ghiAdjustedBaseline * scaleFactor)
    }));
  };

  const chartData = getProjectChartData(periodId);
  const actualTotal = chartData.reduce((sum: number, point) => sum + point.actual, 0);
  const baselineTotal = chartData.reduce((sum: number, point) => sum + point.baseline, 0);
  const ghiAdjustedTotal = chartData.reduce((sum: number, point) => sum + point.ghiAdjustedBaseline, 0);
  
  // Calculate variances
  const rawVariance = ((actualTotal - baselineTotal) / baselineTotal * 100).toFixed(1);
  const ghiAdjustedVariance = ((actualTotal - ghiAdjustedTotal) / ghiAdjustedTotal * 100).toFixed(1);
  
  const periodLabels = {
    '1w': '1W',
    'mtd': 'MTD', 
    'qtd': 'QTD',
    'ytd': 'YTD'
  };
  
  const currentLabel = periodLabels[periodId as keyof typeof periodLabels] || 'YTD';
  
  return {
    metrics: [
      {
        id: 'raw-variance',
        title: `Raw Variance ${currentLabel}`,
        value: `${parseFloat(rawVariance) >= 0 ? '+' : ''}${Math.abs(baselineTotal - actualTotal).toLocaleString()} kWh`,
        percentage: `${rawVariance}%`,
        isPositive: parseFloat(rawVariance) >= 0,
        subtitle: `(${rawVariance}%)`,
        description: 'Underwritten Baseline'
      },
      {
        id: 'ghi-adjusted',
        title: `GHI Adjusted Variance ${currentLabel}`,
        value: `${parseFloat(ghiAdjustedVariance) >= 0 ? '+' : ''}${Math.abs(ghiAdjustedTotal - actualTotal).toLocaleString()} kWh`,
        percentage: `${ghiAdjustedVariance}%`,
        isPositive: parseFloat(ghiAdjustedVariance) >= 0,
        subtitle: `(${ghiAdjustedVariance}%) GHI Adjusted`,
        description: 'Baseline'
      },
      {
        id: 'variance-30-days',
        title: 'Variance vs 30 Days',
        value: `${(parseFloat(rawVariance) * 0.1).toFixed(1)}%`,
        percentage: '',
        isPositive: false,
        subtitle: 'Change in Raw Variance',
        asOf: 'As of 03-09-2025'
      },
      {
        id: 'availability',
        title: 'Availability',
        value: `${(95 + (totalSelectedProjects - 2.5) * 2).toFixed(0)}%`,
        percentage: '',
        isPositive: true,
        asOf: 'As of 03-09-2025'
      }
    ],
    production: {
      title: `Total Actual Production ${currentLabel}`,
      value: (actualTotal / 1000).toFixed(1),
      unit: 'MWh',
      legendItems: [
        { label: 'Actual', color: '#3B82F6' },
        { label: 'Baseline', color: '#9CA3AF' },
        { label: 'GHI adjusted Baseline', color: '#10B981' }
      ],
      chartData
    },
    revenueVariance: {
      id: 'revenue-variance',
      title: `Revenue Variance ${currentLabel}`,
      value: `${parseFloat(rawVariance) >= 0 ? '+' : '-'}$${Math.abs(Math.round(228426 * scaleFactor)).toLocaleString()}`,
      percentage: '',
      isPositive: parseFloat(rawVariance) >= 0,
      description: 'Est. Net Revenue Compared to Baseline'
    },
    zones: [
      {
        name: 'North',
        projects: selectedProjects.filter(p => p.isSelected && p.location === 'North Zone').length,
        percentage: `${(2.6 * scaleFactor).toFixed(1)}%`,
        isPositive: true
      },
      {
        name: 'South',
        projects: selectedProjects.filter(p => p.isSelected && p.location === 'South Zone').length,
        percentage: `${(-1.2 * scaleFactor).toFixed(1)}%`,
        isPositive: (-1.2 * scaleFactor) >= 0
      },
      {
        name: 'West',
        projects: selectedProjects.filter(p => p.isSelected && p.location === 'West Zone').length,
        percentage: `${(0.8 * scaleFactor).toFixed(1)}%`,
        isPositive: true
      },
      {
        name: 'East',
        projects: selectedProjects.filter(p => p.isSelected && p.location === 'East Zone').length,
        percentage: `${(-5.3 * scaleFactor).toFixed(1)}%`,
        isPositive: (-5.3 * scaleFactor) >= 0
      }
    ],
    timePeriodTabs: dashboardData.timePeriodTabs.map(tab => ({
      ...tab,
      isActive: tab.id === periodId
    })),
    selectedProjects
  };
};
