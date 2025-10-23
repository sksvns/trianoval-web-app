import React, { useState, useRef, useEffect } from 'react';
import { Project } from '@/types/dashboard';
import { Typography } from '@/components/atoms/Typography';
import { cn } from '@/utils/helpers';

interface MultiSelectDropdownProps {
  projects: Project[];
  onChange: (updatedProjects: Project[]) => void;
  className?: string;
}

export function MultiSelectDropdown({ projects, onChange, className }: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCount = projects.filter(p => p.isSelected).length;
  const totalCount = projects.length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProjectToggle = (projectId: string) => {
    const updatedProjects = projects.map(project => 
      project.id === projectId 
        ? { ...project, isSelected: !project.isSelected }
        : project
    );
    onChange(updatedProjects);
  };

  const handleSelectAll = () => {
    const allSelected = projects.every(p => p.isSelected);
    const updatedProjects = projects.map(project => ({
      ...project,
      isSelected: !allSelected
    }));
    onChange(updatedProjects);
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      {/* Dropdown button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Typography variant="body1" className="font-medium">
            Projects ({selectedCount}/{totalCount})
          </Typography>
        </div>
        <span className={cn('transition-transform duration-200', isOpen ? 'rotate-180' : '')}>
          ▼
        </span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {/* Select All option */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSelectAll}
              className="flex items-center w-full px-2 py-1 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
            >
              <input
                type="checkbox"
                checked={projects.every(p => p.isSelected)}
                onChange={() => {}} // Handled by button onClick
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <Typography variant="body2" className="font-medium">
                Select All
              </Typography>
            </button>
          </div>

          {/* Project list */}
          <div className="p-2">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => handleProjectToggle(project.id)}
                className="flex items-center w-full px-2 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
              >
                <input
                  type="checkbox"
                  checked={project.isSelected}
                  onChange={() => {}} // Handled by button onClick
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Typography variant="body2" className="font-medium truncate">
                      {project.name}
                    </Typography>
                    <span className={cn('px-2 py-0.5 text-xs rounded-full', getStatusColor(project.status))}>
                      {project.status}
                    </span>
                  </div>
                  <Typography variant="body2" color="secondary" className="text-xs">
                    {project.location} • {project.capacity} MW
                  </Typography>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
