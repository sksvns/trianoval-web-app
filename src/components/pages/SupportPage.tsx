"use client";

import React, { useMemo, useState } from 'react';
import { Card } from '@/components/atoms/Card';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import supportData, { tickets as initialTickets, projectsList, ticketStatuses, Ticket } from '@/data/supportData';
import { cn } from '@/utils/helpers';

export function SupportPage({ className }: { className?: string }) {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All Statuses');
  const [projectFilter, setProjectFilter] = useState<string>('All Projects');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(initialTickets[0]?.id ?? null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    project: 'Project Alpha',
    description: ''
  });

  const filtered = useMemo(() => {
    return tickets.filter(t => {
      if (statusFilter !== 'All Statuses' && t.status !== statusFilter) return false;
      if (projectFilter !== 'All Projects' && t.project !== projectFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return t.subject.toLowerCase().includes(q) || t.id.toLowerCase().includes(q) || (t.project && t.project.toLowerCase().includes(q));
    });
  }, [tickets, search, statusFilter, projectFilter]);

  const selectedTicket: Ticket | undefined = tickets.find(t => t.id === selectedTicketId) ?? filtered[0];

  // Generate new ticket ID
  const generateTicketId = () => {
    const maxId = Math.max(...tickets.map(t => parseInt(t.id.replace('#TKT-', '')) || 0));
    return `#TKT-${String(maxId + 1).padStart(3, '0')}`;
  };

  const handleCreateTicket = () => {
    if (!formData.subject || !formData.project || !formData.description) {
      return;
    }

    const now = new Date();
    const dateRaised = now.toISOString().split('T')[0];
    
    // Format lastUpdate to match existing format: 'YYYY-MM-DD HH:MM'
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const lastUpdate = `${dateRaised} ${hours}:${minutes}`;

    const newTicket: Ticket = {
      id: generateTicketId(),
      subject: formData.subject,
      project: formData.project,
      dateRaised,
      status: 'Open',
      lastUpdate,
      description: formData.description
    };

    setTickets(prev => [newTicket, ...prev]);
    setSelectedTicketId(newTicket.id);
    
    // Reset form and close modal
    setFormData({ subject: '', project: 'Project Alpha', description: '' });
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({ subject: '', project: 'Project Alpha', description: '' });
  };

  const statusToStep = (status: string) => {
    switch (status) {
      case 'Open': return 0;
      case 'Assigned': return 1;
      case 'In Progress': return 2;
      case 'Resolved': return 3;
      case 'Closed': return 3;
      default: return 0;
    }
  };

  const currentStep = selectedTicket ? statusToStep(selectedTicket.status) : 0;

  return (
    <div className={cn('p-3 sm:p-6 lg:p-8', className)}>
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h3" className="font-bold">Support</Typography>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>+ New Ticket</Button>
      </div>

      {/* Create Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={handleModalClose}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl m-4 p-6 transform transition-all" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <Typography variant="h5" className="font-semibold mb-2">Create Support Ticket</Typography>
                <Typography variant="body2" color="secondary">Describe your issue and our team will assist you.</Typography>
              </div>
              <button
                onClick={handleModalClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief description of the issue."
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project</label>
                <div className="relative">
                  <select
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide detailed information about the issue."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
              <Button variant="primary" onClick={handleCreateTicket}>Create Ticket</Button>
            </div>
          </div>
        </div>
      )}

      <Card padding="lg" shadow="sm">
        <div className="flex flex-col gap-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <h4>Ticket History</h4>
            <div className="relative flex-1 max-w-xs">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tickets..."
                className="w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none"
              />
            </div>

            <select className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>All Statuses</option>
              {ticketStatuses.map(s => <option key={s}>{s}</option>)}
            </select>

            <select className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
              <option>All Projects</option>
              {projectsList.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          {/* Ticket table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-500 dark:text-gray-400">
                  <th className="py-3 px-4">TICKET ID</th>
                  <th className="py-3 px-4">SUBJECT</th>
                  <th className="py-3 px-4">PROJECT</th>
                  <th className="py-3 px-4">DATE RAISED</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4">LAST UPDATE</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => (
                  <tr key={t.id} className={cn('border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer', selectedTicketId === t.id ? 'bg-blue-50 dark:bg-blue-900/30' : '')} onClick={() => setSelectedTicketId(t.id)}>
                    <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-200 font-medium">{t.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{t.subject}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{t.project}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{t.dateRaised}</td>
                    <td className="py-3 px-4">
                      <span className={cn('px-3 py-1 rounded-full text-sm font-medium', t.status === 'Resolved' ? 'bg-green-100 text-green-800' : t.status === 'Open' ? 'bg-red-100 text-red-800' : t.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800')}>{t.status}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{t.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Live status tracking */}
      <div className="mt-6">
        <Card padding="lg" shadow="sm">
          <Typography variant="h6" className="font-semibold mb-6">Live Ticket Status Tracking: {selectedTicket?.id ?? '—'}</Typography>

          <div className="flex items-start gap-8 overflow-x-auto pb-4">
            {[
              { label: 'Ticket Raised', icon: 'DocumentIcon', status: 'completed' },
              { label: 'Assigned', icon: 'UserPlusIcon', status: 'completed' },
              { label: 'In Progress', icon: 'UsersIcon', status: 'current' },
              { label: 'Resolved', icon: 'CheckIcon', status: 'pending' }
            ].map((step, idx) => {
              const isCompleted = step.status === 'completed';
              const isCurrent = step.status === 'current';
              const isPending = step.status === 'pending';
              
              return (
                <div key={step.label} className="flex items-center gap-6 min-w-[150px]">
                  <div className="flex flex-col items-center gap-2">
                    <div className={cn(
                      'w-14 h-14 rounded-full flex items-center justify-center shadow-sm transition-all',
                      isCompleted ? 'bg-purple-600 text-white' : isCurrent ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-500'
                    )}>
                      {step.icon === 'DocumentIcon' && (
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {step.icon === 'UserPlusIcon' && (
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      )}
                      {step.icon === 'UsersIcon' && (
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                      {step.icon === 'CheckIcon' && (
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      <span className={cn('text-sm font-medium', isCompleted || isCurrent ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500')}>{step.label}</span>
                      {isCurrent && <span className="text-xs text-yellow-700 dark:text-yellow-400 font-medium mt-0.5">Current</span>}
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {idx === 0 && 'Apr 10, 9:00 AM'}
                        {idx === 1 && 'Apr 10, 9:15 AM'}
                        {idx === 2 && 'Apr 10, 10:30 AM'}
                        {idx === 3 && '—'}
                      </span>
                    </div>
                  </div>
                  {idx < 3 && (
                    <div className={cn(
                      'h-0.5 w-16 transition-all',
                      isCompleted ? 'bg-purple-600' : isCurrent ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SupportPage;
