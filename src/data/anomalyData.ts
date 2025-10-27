export type OutageCategory = 'Hardware' | 'Software' | 'External' | 'Planned';
export type OutageStatus = 'Need Immediate Action' | 'Active' | 'Resolved' | 'Pending';

export interface Outage {
  id: string;
  project: string;
  reason: string;
  category: OutageCategory;
  status: OutageStatus;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD or '-'
}

export const projectsList = ['Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta', 'Project Epsilon', 'General'];

export const outages: Outage[] = [
  {
    id: 'OUT-001',
    project: 'Project Alpha',
    reason: 'Inverter Failure',
    category: 'Hardware',
    status: 'Need Immediate Action',
    startDate: '2025-03-01',
    endDate: '-'
  },
  {
    id: 'OUT-002',
    project: 'Project Beta',
    reason: 'Grid Connection Lost',
    category: 'External',
    status: 'Active',
    startDate: '2025-02-20',
    endDate: '-'
  },
  {
    id: 'OUT-003',
    project: 'Project Gamma',
    reason: 'Software Update Bug',
    category: 'Software',
    status: 'Resolved',
    startDate: '2025-02-15',
    endDate: '2025-02-18'
  },
  {
    id: 'OUT-004',
    project: 'Project Alpha',
    reason: 'Panel Degradation',
    category: 'Hardware',
    status: 'Pending',
    startDate: '2025-01-10',
    endDate: '-'
  },
  {
    id: 'OUT-005',
    project: 'Project Delta',
    reason: 'Communication Error',
    category: 'Software',
    status: 'Active',
    startDate: '2025-03-05',
    endDate: '-'
  },
  {
    id: 'OUT-006',
    project: 'Project Epsilon',
    reason: 'Scheduled Maintenance',
    category: 'Planned',
    status: 'Resolved',
    startDate: '2025-02-25',
    endDate: '2025-02-26'
  },
  {
    id: 'OUT-007',
    project: 'Project Beta',
    reason: 'Transformer Overload',
    category: 'Hardware',
    status: 'Active',
    startDate: '2025-03-08',
    endDate: '-'
  },
  {
    id: 'OUT-008',
    project: 'Project Gamma',
    reason: 'Weather Alert',
    category: 'External',
    status: 'Resolved',
    startDate: '2025-02-12',
    endDate: '2025-02-13'
  },
  {
    id: 'OUT-009',
    project: 'Project Delta',
    reason: 'Firmware Issue',
    category: 'Software',
    status: 'Need Immediate Action',
    startDate: '2025-03-06',
    endDate: '-'
  },
  {
    id: 'OUT-010',
    project: 'Project Epsilon',
    reason: 'Preventive Maintenance',
    category: 'Planned',
    status: 'Resolved',
    startDate: '2025-02-20',
    endDate: '2025-02-20'
  }
];

export const groupByOptions = ['Status', 'Category', 'Project'];
export const filterByOptions = ['All', 'Active Only', 'Resolved'];

export default { outages, projectsList, groupByOptions, filterByOptions };

