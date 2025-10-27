"use client";

import React, { useState } from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import settingsData, { recipients as mockRecipients, siteDetails, projectLocationsImage } from '@/data/settingsData';
import { cn } from '@/utils/helpers';

export function SettingsPage({ className }: { className?: string }) {
  const [recipients, setRecipients] = useState(mockRecipients.map(r => r.email));
  const [inputValue, setInputValue] = useState('');

  const addRecipient = () => {
    const email = inputValue.trim();
    if (!email) return;
    if (recipients.includes(email)) {
      setInputValue('');
      return;
    }
    setRecipients(prev => [...prev, email]);
    setInputValue('');
  };

  const removeRecipient = (email: string) => {
    setRecipients(prev => prev.filter(e => e !== email));
  };

  return (
    <div className={cn('p-3 sm:p-6 lg:p-8', className)}>
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h3" className="font-bold">Settings</Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - wide */}
        <div className="lg:col-span-2 space-y-6">
          <Card padding="lg" shadow="sm">
            <Typography variant="h5" className="font-semibold mb-3">Alert Setting on Anomaly</Typography>

            <div className="mb-4">
              <Typography variant="subtitle2" color="secondary" className="mb-2">Recipients</Typography>
              <div className="flex gap-2 items-center">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addRecipient()}
                  placeholder="Enter email addresses"
                  className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button onClick={addRecipient} variant="primary">Add</Button>
              </div>
            </div>

            <div className="space-y-2">
              {recipients.map(email => (
                <div key={email} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 group">
                  <span className="text-sm text-gray-700 dark:text-gray-200">{email}</span>
                  <button 
                    onClick={() => removeRecipient(email)} 
                    className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="lg" shadow="sm">
            <Typography variant="h5" className="font-semibold mb-3">Site Details</Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Typography variant="subtitle2" color="secondary" className="mb-1">Address</Typography>
                <Typography variant="body2" className="text-gray-800 dark:text-gray-200">{siteDetails.address}</Typography>
              </div>
              <div>
                <Typography variant="subtitle2" color="secondary" className="mb-1">Point of Contact</Typography>
                <Typography variant="body2" className="text-gray-800 dark:text-gray-200">{siteDetails.pointOfContact}</Typography>
              </div>
            </div>

            <div className="mt-4">
              <Typography variant="subtitle2" color="secondary" className="mb-1">Hardware Details</Typography>
              <Typography variant="body2" className="text-gray-800 dark:text-gray-200">{siteDetails.hardwareDetails}</Typography>
            </div>
          </Card>
        </div>

        {/* Right column - map */}
        <div className="space-y-4">
          <Card padding="lg" shadow="sm">
            <Typography variant="h6" className="font-semibold mb-4">Project Locations</Typography>
            <div className="w-full h-80 rounded-lg overflow-hidden bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800 relative border border-gray-100 dark:border-gray-700">
              <img 
                src={projectLocationsImage} 
                alt="Project locations" 
                className="object-contain w-full h-full p-6"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
