import React from 'react';
import { useState, useEffect, Suspense } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface HistoricalPerformanceItem {
  date: string;
  timestamp: any; 
  sumInversion: number;
  price: any; 
  inversion: number; 
  portfolio: number; 
  change: number; 
  percentage: number; 
}

interface ChartData {
  options: any;
  series: any[];
}

const DCAchart = ({ historicalPerformance }: { historicalPerformance: HistoricalPerformanceItem[] }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    if (historicalPerformance) {
      const dates = historicalPerformance.map((elem: HistoricalPerformanceItem) => elem.date);
      const inversion = historicalPerformance.map((elem: HistoricalPerformanceItem) => elem.sumInversion);
      const portafolio = historicalPerformance.map((elem: HistoricalPerformanceItem) => elem.portfolio);
      const options = {
        chart: {
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          strokeDashArray: 3,
          borderColor: "rgba(0,0,0,0.1)",
        },
        stroke: {
          curve: "smooth",
          width: 1,
        },
        xaxis: {
          categories: dates,
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(val);
            }
          }
        }
      };
      const series = [
        {
          name: "Invertido",
          data: inversion,
        },
        {
          name: "Portafolio",
          data: portafolio,
        },
      ];
      setChartData({ options, series });
      setIsLoading(false);
    }
  }, [historicalPerformance]);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">DCA Calculadora</CardTitle>
        {chartData && (
          <Chart
            type="area"
            width="100%"
            height="390"
            options={chartData.options}
            series={chartData.series}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default DCAchart;
