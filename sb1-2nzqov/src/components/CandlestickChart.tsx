import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';
import { Card } from './ui/card';
import type { CandlestickData } from '@/lib/types';

interface CandlestickChartProps {
  data: CandlestickData[];
}

export function CandlestickChart({ data }: CandlestickChartProps) {
  return (
    <Card className="p-4 h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
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
                const data = payload[0].payload;
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Open
                        </span>
                        <span className="font-bold text-muted-foreground">
                          ${data.open}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Close
                        </span>
                        <span className="font-bold text-muted-foreground">
                          ${data.close}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          High
                        </span>
                        <span className="font-bold text-muted-foreground">
                          ${data.high}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Low
                        </span>
                        <span className="font-bold text-muted-foreground">
                          ${data.low}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="volume"
            fill="hsl(var(--muted-foreground))"
            opacity={0.3}
            yAxisId="volume"
          />
          <Bar
            dataKey={['low', 'high']}
            fill={({ close, open }) =>
              close > open
                ? 'hsl(var(--chart-2))'
                : 'hsl(var(--destructive))'
            }
          />
          <Bar
            dataKey={['open', 'close']}
            fill={({ close, open }) =>
              close > open
                ? 'hsl(var(--chart-2))'
                : 'hsl(var(--destructive))'
            }
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
}