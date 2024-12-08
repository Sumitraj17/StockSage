"use client";

import { useEffect, useState, useContext } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import DashboardContext from "@/context/DashboardContext.js";

const chartConfig = {
  sales: {
    label: "Total Sales",
    color: "#3182CE",
  },
  unitsSold: {
    label: "Units Sold",
    color: "#E53E3E",
  },
};

export function BarChart() {
  const { merged } = useContext(DashboardContext); // Accessing merged data from context
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (merged) {
      const data = merged
        .slice(0, 5) // Limit to the top 5 items
        .map(item => ({
          month: item["Product Name"],
          totalStock: item["Total Stock"],
          unitsSold: item["Unit Sold"],
        }));
      setChartData(data);
    }
  }, [merged]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales & Units Sold Comparison</CardTitle>
        <CardDescription>Top 5 Products</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <RechartsBarChart data={chartData} barGap={8} barCategoryGap="20%">
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <Legend />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="totalStock" fill={chartConfig.sales.color} radius={[4, 4, 0, 0]} />
            <Bar dataKey="unitsSold" fill={chartConfig.unitsSold.color} radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total stock and units sold for the top 5 products.
        </div>
      </CardFooter>
    </Card>
  );
}
