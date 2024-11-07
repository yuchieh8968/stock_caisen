import { BarChart3, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group';
import type { ChartType } from '@/lib/types';

interface ChartTypeSelectorProps {
  value: ChartType;
  onValueChange: (value: ChartType) => void;
}

export function ChartTypeSelector({ value, onValueChange }: ChartTypeSelectorProps) {
  return (
    <ToggleGroup type="single" value={value} onValueChange={onValueChange}>
      <ToggleGroupItem value="line" aria-label="Line Chart">
        <LineChart className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="candlestick" aria-label="Candlestick Chart">
        <BarChart3 className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}