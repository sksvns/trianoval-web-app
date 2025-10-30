"use client";

import React, { useState } from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Card } from '@/components/atoms/Card';
import { cn } from '@/utils/helpers';
import { forecastData, forecastMetrics, timeRangeOptions } from '@/data/forecastingData';

function AreaChartForecast({ data }: { data: { month: string; actual: number; ghi: number; baseline: number }[] }) {
  const maxValue = Math.max(...data.flatMap(d => [d.actual, d.ghi, d.baseline]));

  const paddingLeft = 48;
  const paddingRight = 16;
  const paddingTop = 16;
  const paddingBottom = 40;
  const innerWidth = 760;
  const innerHeight = 260;
  const width = innerWidth + paddingLeft + paddingRight;
  const height = innerHeight + paddingTop + paddingBottom;

  const getX = (i: number) => {
    if (data.length === 1) return paddingLeft + innerWidth / 2;
    const t = i / (data.length - 1);
    return paddingLeft + t * innerWidth;
  };
  const getY = (v: number) => paddingTop + innerHeight - (v / maxValue) * innerHeight;

  const toPath = (values: number[]) => {
    const points = values.map((v, i) => ({ x: getX(i), y: getY(v) }));
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x},${points[0].y}`;
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];
      const smoothing = 0.2;
      const cp1x = p1.x + (p2.x - p0.x) * smoothing;
      const cp1y = p1.y + (p2.y - p0.y) * smoothing;
      const cp2x = p2.x - (p3.x - p1.x) * smoothing;
      const cp2y = p2.y - (p3.y - p1.y) * smoothing;
      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return d;
  };

  const series = [
    { key: 'actual', color: '#3b82f6', label: 'Actual' },
    { key: 'ghi', color: '#22c55e', label: 'GHI' },
    { key: 'baseline', color: '#9ca3af', label: 'Baseline' },
  ] as const;
  const yTicks = [1, 0.8, 0.6, 0.4, 0.2, 0].map(r => Math.round(maxValue * r));

  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pointerX = e.clientX - rect.left;
    let minDist = Infinity;
    let nearest = 0;
    for (let i = 0; i < data.length; i++) {
      const dx = Math.abs(getX(i) - pointerX);
      if (dx < minDist) {
        minDist = dx;
        nearest = i;
      }
    }
    setHoverIndex(nearest);
  };
  const clearHover = () => setHoverIndex(null);

  let tooltipContent = null;
  let tooltipX = 0;
  let tooltipY = 0;
  if (hoverIndex !== null && data[hoverIndex]) {
    const d = data[hoverIndex];
    tooltipX = getX(hoverIndex);
    tooltipY = Math.min(...series.map(s => getY(d[s.key])));
    tooltipY = Math.max(tooltipY - 40, 0);
    const tooltipWidth = 160;
    let leftPx = tooltipX;
    const leftLimit = paddingLeft + 10;
    const rightLimit = width - paddingRight - 10 - tooltipWidth;
    if (leftPx < leftLimit) leftPx = leftLimit;
    else if (leftPx > rightLimit) leftPx = rightLimit;
    tooltipContent = (
      <div
        style={{
          left: `${(leftPx / width) * 100}%`,
          top: 150,
          transform: 'translate(-0%, -100%)',
          pointerEvents: 'none',
          position: 'absolute',
          zIndex: 10,
          minWidth: tooltipWidth,
          maxWidth: tooltipWidth,
        }}
        className="bg-white dark:bg-gray-900 shadow-lg rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700 text-xs"
      >
        <div className="font-bold mb-1">{d.month}</div>
        <div className="flex flex-col gap-1">
          {series.map(s => (
            <div key={s.key} className="flex items-center gap-2">
              <span style={{ backgroundColor: s.color, borderRadius: '50%', display: 'inline-block', width: 10, height: 10 }} />
              <span className="w-24 inline-block">{s.label}:</span>
              <span className="font-mono">{d[s.key]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-50 dark:bg-gray-700 rounded-lg p-2 overflow-hidden select-none">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-80 cursor-crosshair"
        aria-label="Forecast area chart"
        onPointerMove={handlePointer}
        onPointerLeave={clearHover}
        onPointerDown={handlePointer}
        onPointerUp={clearHover}
      >
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`forecast-grad-${s.key}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {yTicks.map((val, i) => {
          const y = getY(val);
          return (
            <g key={i}>
              <line x1={paddingLeft} x2={width - paddingRight} y1={y} y2={y} className="stroke-gray-200 dark:stroke-gray-600" strokeDasharray="2,3" />
              <text x={paddingLeft - 8} y={y + 4} className="fill-gray-500 dark:fill-gray-300 text-[10px]" textAnchor="end">{val}</text>
            </g>
          );
        })}
        {data.map((p, i) => (
          <text key={i} x={getX(i)} y={height - 12} className="fill-gray-500 dark:fill-gray-300 text-[10px]" textAnchor="middle">{p.month}</text>
        ))}
        {series.map((s) => {
          const values = data.map(d => d[s.key]);
          const path = toPath(values);
          const areaPath = `${path} L ${getX(values.length - 1)},${getY(0)} L ${getX(0)},${getY(0)} Z`;
          return (
            <g key={s.key}>
              <path d={areaPath} fill={`url(#forecast-grad-${s.key})`} />
              <path d={path} fill="none" stroke={s.color} strokeWidth={2} />
            </g>
          );
        })}
        {hoverIndex !== null && (
          <g>
            <line
              x1={getX(hoverIndex)}
              x2={getX(hoverIndex)}
              y1={paddingTop}
              y2={paddingTop + innerHeight}
              stroke="#8884d8"
              strokeDasharray="4,2"
              strokeWidth={2}
              opacity={0.6}
            />
            {series.map((s, idx) => (
              <circle
                key={s.key}
                cx={getX(hoverIndex)}
                cy={getY(data[hoverIndex][s.key])}
                r={6}
                fill="#fff"
                stroke={s.color}
                strokeWidth={3}
                opacity={0.99}
              />
            ))}
          </g>
        )}
      </svg>
      {hoverIndex !== null && tooltipContent}
    </div>
  );
}

export function ForecastingPage({ className }: { className?: string }) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('Next 12 Months');

  const formatCurrency = (value: string) => {
    return value;
  };

  const formatPower = (value: string) => {
    return value;
  };

  return (
    <div className={cn('p-3 sm:p-6 lg:p-8', className)}>
      {/* Header with title and time range selector */}
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h3" className="font-bold">Company Forecasting</Typography>
        
        <div className="relative">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            {timeRangeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Forecasted Revenue Card */}
        <Card padding="lg" shadow="sm">
          <div className="flex items-start justify-between">
            <div>
              <Typography variant="subtitle1" className="text-gray-600 dark:text-gray-400 mb-2">
                Forecasted Revenue
              </Typography>
              <Typography variant="h4" className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                {formatCurrency(forecastMetrics.forecastedRevenue.value)}
              </Typography>
              <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
                {forecastMetrics.forecastedRevenue.period}
              </Typography>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </Card>

        {/* Forecasted Power Generation Card */}
        <Card padding="lg" shadow="sm">
          <div className="flex items-start justify-between">
            <div>
              <Typography variant="subtitle1" className="text-gray-600 dark:text-gray-400 mb-2">
                Forecasted Power Generation
              </Typography>
              <Typography variant="h4" className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                {formatPower(forecastMetrics.forecastedPowerGeneration.value)}
              </Typography>
              <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
                {forecastMetrics.forecastedPowerGeneration.period}
              </Typography>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      {/* Chart Card */}
      <Card padding="lg" shadow="sm">
        <Typography variant="h6" className="font-semibold mb-4">12-Month Production Forecast (MWh)</Typography>
        {/* Custom Legend for Forecasting Chart */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">Actual</Typography>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">GHI</Typography>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">Baseline</Typography>
          </div>
        </div>
        {/* Area Chart Visualization */}
        <div className="relative">
          <AreaChartForecast data={forecastData} />
        </div>
      </Card>
    </div>
  );
}

export default ForecastingPage;

