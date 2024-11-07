import { Card } from './ui/card';
import type { StockDetails as StockDetailsType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface StockDetailsProps {
  details: StockDetailsType;
}

export function StockDetails({ details }: StockDetailsProps) {
  const stats = [
    { label: 'Open', value: `$${details.open.toFixed(2)}` },
    { label: 'High', value: `$${details.high.toFixed(2)}` },
    { label: 'Low', value: `$${details.low.toFixed(2)}` },
    {
      label: 'Volume',
      value: `${(details.volume / 1000000).toFixed(2)}M`,
    },
    {
      label: 'Market Cap',
      value: `$${(details.marketCap / 1000000000).toFixed(2)}B`,
    },
    { label: 'P/E Ratio', value: details.pe.toFixed(2) },
    { label: 'Dividend Yield', value: `${details.dividend.toFixed(2)}%` },
  ];

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">{details.name}</h2>
          <p className="text-sm text-muted-foreground">{details.symbol}</p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">${details.price.toFixed(2)}</span>
          <span
            className={cn(
              'text-sm font-medium',
              details.change > 0 ? 'text-emerald-500' : 'text-red-500'
            )}
          >
            {details.change > 0 ? '+' : ''}
            {details.change.toFixed(2)} ({details.changePercent.toFixed(2)}%)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="font-medium">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}