import React from 'react';
import { ProductionData, ChartDataPoint } from '@/types/dashboard';
import { Card } from '@/components/atoms/Card';
import { Typography } from '@/components/atoms/Typography';
import { cn } from '@/utils/helpers';

interface ProductionChartProps {
  data: ProductionData;
  className?: string;
}

interface AreaChartProps {
  data: ChartDataPoint[];
  legendItems: { label: string; color: string; }[];
}

function AreaChart({ data, legendItems }: AreaChartProps) {
  // Compute bounds
  const maxValue = Math.max(
    ...data.flatMap(d => [d.actual, d.baseline, d.ghiAdjustedBaseline])
  );

  const paddingLeft = 48; // room for y-axis labels
  const paddingRight = 16;
  const paddingTop = 16;
  const paddingBottom = 40; // room for x labels
  const innerWidth = 760; // logical width for viewBox scaling
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
    // Simple Catmull-Rom to Bezier conversion for smooth curves
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
    { key: 'actual', color: '#3b82f6', label: 'Actual' }, // blue-500
    { key: 'baseline', color: '#9ca3af', label: 'Baseline' }, // gray-400
    { key: 'ghiAdjustedBaseline', color: '#22c55e', label: 'GHI adjusted Baseline' }, // green-500
  ] as const;

  const yTicks = [1, 0.8, 0.6, 0.4, 0.2, 0].map(r => Math.round(maxValue * r));

  // --- Tooltip State and Handlers ---
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  // Mouse/touch handling to find nearest data point
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

  // Tooltip layout: show above the cursor position, keep within chart bounds
  let tooltipContent = null;
  let tooltipX = 0;
  let tooltipY = 0;
  if (hoverIndex !== null && data[hoverIndex]) {
    const d = data[hoverIndex];
    tooltipX = getX(hoverIndex);
    tooltipY = Math.min(...series.map(s => getY(d[s.key])));
    tooltipY = Math.max(tooltipY - 40, 0);
    // Keep the tooltip in chart bounds horizontally
    const tooltipWidth = 160; // px, approximate width
    const px = (tooltipX / width) * 100;
    // left limit = 0+paddingLeft+10, right limit = width-paddingRight-10
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
        <div className="font-bold mb-1">{d.period}</div>
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
        aria-label="Production area chart"
        onPointerMove={handlePointer}
        onPointerLeave={clearHover}
        onPointerDown={handlePointer}
        onPointerUp={clearHover}
      >
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {/* Y grid and labels */}
        {yTicks.map((val, i) => {
          const y = getY(val);
          return (
            <g key={i}>
              <line x1={paddingLeft} x2={width - paddingRight} y1={y} y2={y} className="stroke-gray-200 dark:stroke-gray-600" strokeDasharray="2,3" />
              <text x={paddingLeft - 8} y={y + 4} className="fill-gray-500 dark:fill-gray-300 text-[10px]" textAnchor="end">{val}</text>
            </g>
          );
        })}

        {/* X axis labels */}
        {data.map((p, i) => (
          <text key={i} x={getX(i)} y={height - 12} className="fill-gray-500 dark:fill-gray-300 text-[10px]" textAnchor="middle">{p.period}</text>
        ))}

        {/* Areas and lines */}
        {series.map((s) => {
          const values = data.map(d => d[s.key]);
          const path = toPath(values);
          const areaPath = `${path} L ${getX(values.length - 1)},${getY(0)} L ${getX(0)},${getY(0)} Z`;
          return (
            <g key={s.key}>
              <path d={areaPath} fill={`url(#grad-${s.key})`} />
              <path d={path} fill="none" stroke={s.color} strokeWidth={2} />
            </g>
          );
        })}

        {/* Vertical line and highlight circles on hover */}
        {hoverIndex !== null && (
          <g>
            {/* Vertical Line */}
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
            {/* Circles at series points */}
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
      {/* Tooltip overlay */}
      {hoverIndex !== null && tooltipContent}
    </div>
  );
}

export function ProductionChart({ data, className }: ProductionChartProps) {
  // Use default chart data if none provided
  const defaultChartData = [
    { period: 'Q1', actual: 4950, baseline: 5150, ghiAdjustedBaseline: 5350 },
    { period: 'Q2', actual: 5600, baseline: 5280, ghiAdjustedBaseline: 5440 },
    { period: 'Q3', actual: 3500,baseline: 5070, ghiAdjustedBaseline: 4890 },
    { period: 'Q4', actual: 5221, baseline: 5400, ghiAdjustedBaseline: 5042 }
  ];

  const chartData = data.chartData || defaultChartData;

  return (
    <Card className={cn('', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <Typography variant="h6">
          {data.title}
        </Typography>
        
        <div className="flex flex-wrap gap-3">
          {data.legendItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <Typography variant="body2" color="secondary">
                {item.label}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <Typography variant="h2" color="primary" className="font-bold">
          {data.value} <span className="text-xl font-normal text-gray-600 dark:text-gray-400">{data.unit}</span>
        </Typography>
      </div>
      
      {/* Chart */}
      <div className="relative">
        <AreaChart data={chartData} legendItems={data.legendItems} />
      </div>
    </Card>
  );
}
