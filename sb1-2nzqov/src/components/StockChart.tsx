import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from './ui/card';
import type { ChartData } from '@/lib/types';

interface StockChartProps {
  data: ChartData[];
  isPositive: boolean;
}

export function StockChart({ data, isPositive }: StockChartProps) {
  return (
    <Card className="p-4 h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="timestamp"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Price
                        </span>
                        <span className="font-bold text-muted-foreground">
                          ${payload[0].value}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Time
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {payload[0].payload.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: isPositive ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))' },
            }}
            style={{
              stroke: isPositive ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))',
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}