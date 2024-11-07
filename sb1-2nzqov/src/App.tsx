import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { StockList } from '@/components/StockList';
import { StockChart } from '@/components/StockChart';
import { CandlestickChart } from '@/components/CandlestickChart';
import { StockDetails } from '@/components/StockDetails';
import { DateRangePicker } from '@/components/DateRangePicker';
import { ChartTypeSelector } from '@/components/ChartTypeSelector';
import type { StockData, StockDetails as StockDetailsType, ChartType, CandlestickData } from '@/lib/types';

// Placeholder data - replace with API calls
const mockStocks: StockData[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 173.50,
    change: 2.35,
    changePercent: 1.37,
    volume: 52614350,
    marketCap: 2730000000000,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 338.11,
    change: -1.23,
    changePercent: -0.36,
    volume: 22155680,
    marketCap: 2510000000000,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 125.30,
    change: 0.85,
    changePercent: 0.68,
    volume: 28947650,
    marketCap: 1580000000000,
  },
];

const mockDetails: StockDetailsType = {
  symbol: 'AAPL',
  name: 'Apple Inc.',
  price: 173.50,
  change: 2.35,
  changePercent: 1.37,
  open: 171.15,
  high: 174.20,
  low: 170.98,
  volume: 52614350,
  marketCap: 2730000000000,
  pe: 28.5,
  dividend: 0.65,
  chartData: Array.from({ length: 20 }, (_, i) => ({
    timestamp: `${i + 9}:00`,
    value: 170 + Math.random() * 5,
  })),
};

// Mock candlestick data - replace with API call
const mockCandlestickData: CandlestickData[] = Array.from({ length: 20 }, (_, i) => ({
  timestamp: `${i + 1}`,
  open: 170 + Math.random() * 5,
  close: 170 + Math.random() * 5,
  high: 175 + Math.random() * 5,
  low: 165 + Math.random() * 5,
  volume: 1000000 + Math.random() * 1000000,
}));

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('AAPL');
  const [searchQuery, setSearchQuery] = useState('');
  const [chartType, setChartType] = useState<ChartType>('line');
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });

  const filteredStocks = mockStocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 space-y-4">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold">Stock Analytics</h1>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-[1fr,2fr]">
          <div>
            <StockList
              stocks={filteredStocks}
              onSelect={setSelectedSymbol}
              selectedSymbol={selectedSymbol}
            />
          </div>
          <div className="space-y-4">
            <StockDetails details={mockDetails} />
            <div className="flex items-center justify-between">
              <ChartTypeSelector value={chartType} onValueChange={setChartType} />
              <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
            </div>
            {chartType === 'line' ? (
              <StockChart data={mockDetails.chartData} isPositive={mockDetails.change > 0} />
            ) : (
              <CandlestickChart data={mockCandlestickData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;