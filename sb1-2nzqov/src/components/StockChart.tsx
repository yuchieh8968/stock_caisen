import React, { useEffect, useState } from "react";
import Plot from 'plotly.js-basic-dist';

interface StockChartProps {
  symbol: string;
}

export const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const [chartData, setChartData] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the chart data from the API
    const fetchChartData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/${symbol}`);
        const data = await response.json();
        setChartData(data); // Store chart JSON data in state
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [symbol]);

  useEffect(() => {
    if (chartData) {
      const parsedData = JSON.parse(chartData); // Parse the JSON data
      Plot.newPlot("plotly-chart", parsedData.data, parsedData.layout);
    }
  }, [chartData]);

  return <div id="plotly-chart" style={{ width: "100%", height: "400px" }} />;
};

export default StockChart;
