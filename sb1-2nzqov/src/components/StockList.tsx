import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Card } from './ui/card';
import type { StockData } from '@/lib/types';
import { cn } from '@/lib/utils';

interface StockListProps {
  stocks: StockData[];
  onSelect: (symbol: string) => void;
  selectedSymbol?: string;
}

export function StockList({ stocks, onSelect, selectedSymbol }: StockListProps) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Change</TableHead>
            <TableHead className="text-right">Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow
              key={stock.symbol}
              className={cn(
                'cursor-pointer hover:bg-muted/50',
                selectedSymbol === stock.symbol && 'bg-muted'
              )}
              onClick={() => onSelect(stock.symbol)}
            >
              <TableCell className="font-medium">{stock.symbol}</TableCell>
              <TableCell>{stock.name}</TableCell>
              <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
              <TableCell
                className={cn(
                  'text-right',
                  stock.change > 0 ? 'text-emerald-500' : 'text-red-500'
                )}
              >
                {stock.change > 0 ? '+' : ''}
                {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </TableCell>
              <TableCell className="text-right">
                {(stock.volume / 1000000).toFixed(2)}M
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}