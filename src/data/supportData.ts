export type TicketStatus = 'Open' | 'Assigned' | 'In Progress' | 'Resolved' | 'Closed';

export interface Ticket {
  id: string;
  subject: string;
  project: string;
  dateRaised: string; // ISO or display
  status: TicketStatus;
  lastUpdate: string;
  description?: string;
}

export const projectsList = ['Project Alpha', 'Project Beta', 'Project Gamma', 'General'];

export const tickets: Ticket[] = [
  {
    id: '#TKT-001',
    subject: 'Inverter offline at Site A',
    project: 'Project Alpha',
    dateRaised: '2024-04-10',
    status: 'In Progress',
    lastUpdate: '2024-04-10 14:30',
    description: 'Inverter stopped sending telemetry.'
  },
  {
    id: '#TKT-002',
    subject: 'Panel degradation anomaly',
    project: 'Project Gamma',
    dateRaised: '2024-04-09',
    status: 'Resolved',
    lastUpdate: '2024-04-09 18:00',
    description: 'Panels replaced.'
  },
  {
    id: '#TKT-003',
    subject: 'Communication failure with SCADA',
    project: 'Project Beta',
    dateRaised: '2024-04-08',
    status: 'Open',
    lastUpdate: '2024-04-08 09:15',
    description: 'No connection to SCADA gateway.'
  },
  {
    id: '#TKT-004',
    subject: 'Data sync issue with platform',
    project: 'General',
    dateRaised: '2024-04-07',
    status: 'Closed',
    lastUpdate: '2024-04-07 11:45',
    description: 'Backfill completed.'
  }
];

export const ticketStatuses: TicketStatus[] = ['Open', 'Assigned', 'In Progress', 'Resolved', 'Closed'];

export default { tickets, projectsList, ticketStatuses };
