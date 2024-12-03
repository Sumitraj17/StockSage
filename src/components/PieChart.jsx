"use client";

import { useContext, useMemo } from "react";
import { Pie, PieChart as RechartsPieChart, Tooltip, Cell } from "recharts";
import DashboardContext from "@/context/DashboardContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Colors for the pie chart
const COLORS = [
  "#3182CE", // Blue
  "#E53E3E", // Red
  "#38A169", // Green
  "#DD6B20", // Orange
  "#805AD5", // Purple
  "#D69E2E", // Yellow
  "#63B3ED", // Light Blue
  "#F56565", // Light Red
  "#68D391", // Light Green
  "#F6AD55", // Light Orange
];

export function PieChart() {
  const { merged } = useContext(DashboardContext);

  // Process data for the top 10 products by "Total Sales"
  const chartData = useMemo(() => {
    if (!merged) return [];
    return merged
      .sort((a, b) => b["Total Sales"] - a["Total Sales"])
      .slice(0, 5)
      .map((product) => ({
        name: product["Product Name"],
        value: product["Total Sales"],
      }));
  }, [merged]);

  // Calculate total sales for display in the center
  const totalSales = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top 10 Products - Pie Chart</CardTitle>
        <CardDescription>Sales in the last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <RechartsPieChart width={250} height={250}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={50}
            fill="#8884d8"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </RechartsPieChart>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2 text-sm">
        <div className="font-medium text-lg">
          Total Sales: <span className="font-bold">{totalSales.toLocaleString()}</span>
        </div>
        <div className="text-muted-foreground text-center">
          Displaying top 10 products by sales
        </div>
      </CardFooter>
    </Card>
  );
}
