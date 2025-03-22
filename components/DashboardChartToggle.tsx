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
  { name: "Jan", streams: 12000, subscribers: 3000 },
  { name: "Feb", streams: 18000, subscribers: 4000 },
  { name: "Mar", streams: 22000, subscribers: 5000 },
  { name: "Apr", streams: 26000, subscribers: 6000 },
  { name: "May", streams: 30000, subscribers: 17000 },
  { name: "Jun", streams: 40000, subscribers: 9000 },
  { name: "Jul", streams: 45000, subscribers: 10000 },
  { name: "Aug", streams: 48000, subscribers: 19000 },
  { name: "Sep", streams: 50000, subscribers: 20500 },
  { name: "Oct", streams: 55000, subscribers: 30010 },
  { name: "Nov", streams: 60000, subscribers: 44000 },
  { name: "Dec", streams: 65000, subscribers: 55000 },
];


const DashboardChart = () => {
  const [chartType, setChartType] = useState<GraphType>("bar");

  return (
    <Card className="mb-8">
      <CardHeader>
        <h3 className="text-xl font-semibold text-foreground">
          Streams & Subscribers Chart
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
          <ResponsiveContainer width="100%" height="100%" className="hover:bg-muted/50">
            {chartType === "bar" ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip wrapperClassName="bg-muted/50 shadow-lg rounded-lg p-4 border border-gray-200" />
                <Bar
                  dataKey="streams"
                  fill="#3B82F6"
                  name="Streams"
                  className="cursor-pointer hover:bg-muted/50"
                />
                <Bar
                  dataKey="subscribers"
                  fill="#F59E0B"
                  name="Subscribers"
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
                  dataKey="streams"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Sreams"
                  className="cursor-pointer"
                />
                <Line
                  type="monotone"
                  dataKey="subscribers"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  name="Subscribers"
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
                  dataKey="streams"
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
                  dataKey="streams"
                  stroke="#3B82F6"
                  fill="#BFDBFE"
                  name="Streams"
                  className="cursor-pointer"
                />
                <Area
                  type="monotone"
                  dataKey="subscribers"
                  stroke="#F59E0B"
                  fill="#FDE68A"
                  name="Subscribers"
                  className="cursor-pointer"
                />
              </AreaChart>
            ) : (
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="category" dataKey="name" />
                <YAxis type="number" dataKey="streams" />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "transparent" }}
                />
                <Scatter
                  data={chartData}
                  fill="#9D937B"
                  name="Streams"
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
