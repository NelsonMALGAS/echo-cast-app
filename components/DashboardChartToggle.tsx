"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GraphType } from "@/types";
import { CustomTooltip } from "./ui/custom-tooltip";

// Dummy data for the chart
const chartData = [
  { name: "Jan", revenue: 1200, orders: 300 },
  { name: "Feb", revenue: 1800, orders: 400 },
  { name: "Mar", revenue: 2200, orders: 500 },
  { name: "Apr", revenue: 2600, orders: 600 },
  { name: "May", revenue: 3000, orders: 1700 },
  { name: "Jun", revenue: 4000, orders: 900 },
  { name: "Jul", revenue: 4500, orders: 1000 },
  { name: "Aug", revenue: 4800, orders: 1900 },
  { name: "Sep", revenue: 5000, orders: 2050 },
  { name: "Oct", revenue: 5500, orders: 3001 },
  { name: "Nov", revenue: 6000, orders: 4400 },
  { name: "Dec", revenue: 6500, orders: 5500 },
];

const DashboardChart = () => {
  const [chartType, setChartType] = useState<GraphType>("bar");

  return (
    <Card className="mb-8">
      <CardHeader>
        <h3 className="text-xl font-semibold text-foreground">
          Revenue & Orders Chart
        </h3>
      </CardHeader>
      <CardContent>
        {/* Chart Toggle Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
          <Button
            variant={chartType === "bar" ? "default" : "outline"}
            onClick={() => setChartType("bar")}
          >
            Bar Chart
          </Button>
          <Button
            variant={chartType === "line" ? "default" : "outline"}
            onClick={() => setChartType("line")}
          >
            Line Chart
          </Button>
          <Button
            variant={chartType === "pie" ? "default" : "outline"}
            onClick={() => setChartType("pie")}
          >
            Pie Chart
          </Button>
          <Button
            variant={chartType === "area" ? "default" : "outline"}
            onClick={() => setChartType("area")}
          >
            Area Chart
          </Button>
          <Button
            variant={chartType === "scatter" ? "default" : "outline"}
            onClick={() => setChartType("scatter")}
          >
            Scatter Chart
          </Button>
        </div>

        {/* Separator */}
        <Separator className="mb-4" />

        {/* Responsive Chart */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip wrapperClassName="bg-white shadow-lg rounded-lg p-4 border border-gray-200" />
                <Bar
                  dataKey="revenue"
                  fill="#3B82F6"
                  name="Revenue"
                  className="cursor-pointer"
                />
                <Bar
                  dataKey="orders"
                  fill="#F59E0B"
                  name="Orders"
                  className="cursor-pointer"
                />
              </BarChart>
            ) : chartType === "line" ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "transparent" }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Revenue"
                  className="cursor-pointer"
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  name="Orders"
                  className="cursor-pointer"
                />
              </LineChart>
            ) : chartType === "pie" ? (
              <PieChart>
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "transparent" }}
                />
                <Pie
                  data={chartData}
                  dataKey="revenue"
                  nameKey="name"
                  fill="#3B82F6"
                  label
                  className="cursor-pointer"
                />
              </PieChart>
            ) : chartType === "area" ? (
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "transparent" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  fill="#BFDBFE"
                  name="Revenue"
                  className="cursor-pointer"
                />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#F59E0B"
                  fill="#FDE68A"
                  name="Orders"
                  className="cursor-pointer"
                />
              </AreaChart>
            ) : (
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="category" dataKey="name" />
                <YAxis type="number" dataKey="revenue" />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "transparent" }}
                />
                <Scatter
                  data={chartData}
                  fill="#9D937B"
                  name="Revenue"
                  className="cursor-pointer"
                />
              </ScatterChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardChart;
