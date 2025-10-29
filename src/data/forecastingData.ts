export interface ForecastData {
  month: string;
  actual: number;
  ghi: number;
  baseline: number;
}

export interface ForecastMetrics {
  forecastedRevenue: {
    value: string;
    period: string;
  };
  forecastedPowerGeneration: {
    value: string;
    period: string;
  };
}

export const forecastMetrics: ForecastMetrics = {
  forecastedRevenue: {
    value: '$1.2M',
    period: 'Next 30 days projection'
  },
  forecastedPowerGeneration: {
    value: '8,500 MWh',
    period: 'Next 30 days projection'
  }
};

export const forecastData: ForecastData[] = [
  { month: 'Jan', actual: 1200, ghi: 1400, baseline: 1500 },
  { month: 'Feb', actual: 1350, ghi: 1450, baseline: 1600 },
  { month: 'Mar', actual: 1500, ghi: 1600, baseline: 1700 },
  { month: 'Apr', actual: 1650, ghi: 1750, baseline: 1800 },
  { month: 'May', actual: 1800, ghi: 1900, baseline: 2000 },
  { month: 'Jun', actual: 1950, ghi: 2050, baseline: 2100 },
  { month: 'Jul', actual: 2100, ghi: 2200, baseline: 2300 },
  { month: 'Aug', actual: 2000, ghi: 2100, baseline: 2200 },
  { month: 'Sep', actual: 1850, ghi: 1950, baseline: 2000 },
  { month: 'Oct', actual: 1700, ghi: 1800, baseline: 1900 },
  { month: 'Nov', actual: 1550, ghi: 1650, baseline: 1750 },
  { month: 'Dec', actual: 1400, ghi: 1500, baseline: 1600 }
];

export const timeRangeOptions = ['Next 12 Months', 'Next 6 Months', 'Next 3 Months', 'Next 1 Month'];

export default { forecastData, forecastMetrics, timeRangeOptions };

