export type TransactionType = 'Sell' | 'Buy';
export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  date: string;
  transactionType: TransactionType;
  amount: number;
  rate: number;
  total: number;
  status: TransactionStatus;
}

export const projectsList = ['All Projects', 'Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta', 'Project Epsilon', 'General'];

export const transactions: Transaction[] = [
  { id: '1', date: '2025-03-15', transactionType: 'Sell', amount: 5250, rate: 0.12, total: 630.00, status: 'completed' },
  { id: '2', date: '2025-03-14', transactionType: 'Buy', amount: 1000, rate: 0.09, total: 90.00, status: 'completed' },
  { id: '3', date: '2025-03-13', transactionType: 'Sell', amount: 4800, rate: 0.11, total: 528.00, status: 'completed' },
  { id: '4', date: '2025-03-12', transactionType: 'Sell', amount: 5100, rate: 0.12, total: 612.00, status: 'completed' },
  { id: '5', date: '2025-03-11', transactionType: 'Buy', amount: 500, rate: 0.08, total: 40.00, status: 'pending' },
  { id: '6', date: '2025-03-10', transactionType: 'Sell', amount: 4950, rate: 0.11, total: 544.50, status: 'completed' },
  { id: '7', date: '2025-03-09', transactionType: 'Sell', amount: 5300, rate: 0.13, total: 689.00, status: 'failed' },
  { id: '8', date: '2025-03-08', transactionType: 'Buy', amount: 2500, rate: 0.10, total: 250.00, status: 'completed' },
  { id: '9', date: '2025-03-07', transactionType: 'Sell', amount: 4200, rate: 0.11, total: 462.00, status: 'completed' },
  { id: '10', date: '2025-03-06', transactionType: 'Buy', amount: 1500, rate: 0.09, total: 135.00, status: 'completed' },
  { id: '11', date: '2025-03-05', transactionType: 'Sell', amount: 4800, rate: 0.12, total: 576.00, status: 'pending' },
  { id: '12', date: '2025-03-04', transactionType: 'Sell', amount: 5100, rate: 0.13, total: 663.00, status: 'completed' },
  { id: '13', date: '2025-03-03', transactionType: 'Buy', amount: 2000, rate: 0.08, total: 160.00, status: 'failed' },
  { id: '14', date: '2025-03-02', transactionType: 'Sell', amount: 5500, rate: 0.12, total: 660.00, status: 'completed' },
  { id: '15', date: '2025-03-01', transactionType: 'Sell', amount: 4900, rate: 0.11, total: 539.00, status: 'completed' },
  { id: '16', date: '2025-02-28', transactionType: 'Buy', amount: 1200, rate: 0.09, total: 108.00, status: 'completed' },
  { id: '17', date: '2025-02-27', transactionType: 'Sell', amount: 5000, rate: 0.12, total: 600.00, status: 'completed' },
  { id: '18', date: '2025-02-26', transactionType: 'Sell', amount: 4600, rate: 0.11, total: 506.00, status: 'pending' },
  { id: '19', date: '2025-02-25', transactionType: 'Buy', amount: 800, rate: 0.10, total: 80.00, status: 'completed' },
  { id: '20', date: '2025-02-24', transactionType: 'Sell', amount: 5400, rate: 0.13, total: 702.00, status: 'completed' }
];

export default { transactions, projectsList };

