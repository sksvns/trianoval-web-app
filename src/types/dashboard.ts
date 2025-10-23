export interface MetricCard {
  id: string;
  title: string;
  value: string;
  percentage: string;
  isPositive: boolean;
  subtitle?: string;
  description?: string;
  asOf?: string;
}

export interface ChartDataPoint {
  period: string;
  actual: number;
  baseline: number;
  ghiAdjustedBaseline: number;
}

export interface ProductionData {
  title: string;
  value: string;
  unit: string;
  legendItems: LegendItem[];
  chartData?: ChartDataPoint[];
}

export interface LegendItem {
  label: string;
  color: string;
}

export interface ZoneData {
  name: string;
  projects: number;
  percentage: string;
  isPositive: boolean;
}

export interface TabOption {
  id: string;
  label: string;
  isActive: boolean;
}

export interface DashboardData {
  metrics: MetricCard[];
  production: ProductionData;
  revenueVariance: MetricCard;
  zones: ZoneData[];
  timePeriodTabs: TabOption[];
}

export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
}

export interface UserProfile {
  name: string;
  avatar: string;
  role: string;
}

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  location: string;
  capacity: number; // in MW
  isSelected: boolean;
}

export interface ProjectData extends DashboardData {
  selectedProjects: Project[];
}
