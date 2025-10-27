import { Recipient, SiteDetails } from '@/types/dashboard';

export const recipients: Recipient[] = [
  { id: 'r1', email: 'user1@example.com' },
  { id: 'r2', email: 'user2@example.com' }
];

export const siteDetails: SiteDetails = {
  address: '123 Solar Panel Ave, Sunnyville, CA 90210',
  pointOfContact: 'Jane Doe, Site Manager',
  hardwareDetails: 'Inverter Model: XYZ-1000, Panel Model: ABC-300, 500 Panels'
};

export const projectLocationsImage = '/world-map.svg';

export const settingsData = {
  recipients,
  siteDetails,
  projectLocationsImage
};

export default settingsData;
