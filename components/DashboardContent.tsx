"use client";

import { motion } from "framer-motion";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { Home, Settings, User, Bell, BarChart2, MessageCircle, Mic, Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import DashboardChart from "./DashboardChartToggle";
import ActivityCard from "./ActivityCard";
import { RecentActivityType } from "@/types";
import UserProfile from "./ui/UserProfile";

const DashboardContent = () => {
  const { loading, user } = useAuth();

  // Dummy data for dashboard widgets (replace this later with real MongoDB data)
  const stats = {
    totalStreams: 1500000,
    totalSubscribers: 500000,
    newMessages: 12,
  };
  const recentActivity: RecentActivityType[] = [
    { id: 1, action: "New episode 'Tech Trends' released", date: "2025-03-19" },
    { id: 2, action: "Listener review submitted", date: "2025-03-18" },
    { id: 3, action: "Sponsorship deal signed", date: "2025-03-17" },
    { id: 4, action: "Episode 'AI in 2025' reached 10K streams", date: "2025-03-16" },
    { id: 5, action: "New subscriber milestone: 50K", date: "2025-03-15" },
    { id: 6, action: "Guest speaker confirmed for next episode", date: "2025-03-14" },
    { id: 7, action: "Podcast featured on Apple Podcasts", date: "2025-03-13" },
    { id: 8, action: "Live Q&A session scheduled", date: "2025-03-12" },
    { id: 9, action: "New sponsorship inquiry received", date: "2025-03-11" },
    { id: 10, action: "Social media post reached 100K engagement", date: "2025-03-10" },
  ];

  const tasks = [
    {
      _id: 1,
      episode: "EP-001",
      status: "Editing",
      method: "Remote Recording",
      earnings: "$250.00",
    },
    {
      _id: 2,
      episode: "EP-002",
      status: "Published",
      method: "In-Studio",
      earnings: "$120.50",
    },
    {
      _id: 3,
      episode: "EP-003",
      status: "Scheduled",
      method: "Remote Recording",
      earnings: "$320.75",
    },
    {
      _id: 4,
      episode: "EP-004",
      status: "Recording",
      method: "Live Session",
      earnings: "$50.00",
    },
    {
      _id: 5,
      episode: "EP-005",
      status: "Published",
      method: "In-Studio",
      earnings: "$540.30",
    },
    {
      _id: 6,
      episode: "EP-006",
      status: "Editing",
      method: "Remote Recording",
      earnings: "$80.20",
    },
  ];


  if (!loading && !user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center min-h-[50vh] px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
          Please{" "}
          <Link href="/login">
            <span>Login</span>
          </Link>{" "}
          to access the Dashboard
        </h2>
        <Link href="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-6 py-3 rounded-lg bg-primary text-white font-medium text-lg shadow-md transition-all hover:shadow-lg hover:bg-primary/90"
          >
            Login Now
          </motion.button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="px-4 py-8 md:px-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-bold text-center text-foreground mb-8"
      >
        <div className="text-primary">Dashboard Page</div>
        <span className="text-3xl mt-8">
          {" "}
          Welcome {user?.displayName ? user?.displayName : user?.email}
        </span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Total Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Home size={32} className="text-primary" />
              <h3 className="text-xl font-semibold">Total Streams</h3>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalStreams}</p>
          </CardContent>
        </Card>

        {/* Card 2: Total Revenue */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <User size={32} className="text-primary" />
              <h3 className="text-xl font-semibold">Total Subscribers</h3>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${stats.totalSubscribers}</p>
          </CardContent>
        </Card>

        {/* Card 3: New Messages */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Settings size={32} className="text-primary" />
              <h3 className="text-xl font-semibold">New Messages</h3>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.newMessages}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-xl font-semibold text-foreground">
            Recent Activity
          </h3>
        </CardHeader>
        <CardContent>
          <div className="gap-6 mb-8">
            <ActivityCard recentActivity={recentActivity} />
          </div>
        </CardContent>
      </Card>

      {/* Separator */}
      <Separator className="my-8" />

      {/* Task List with Table */}
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-xl font-semibold text-foreground">Task List</h3>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Episode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Earnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell className="font-medium">{task.episode}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.method}</TableCell>
                  <TableCell className="text-right">{task.earnings}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Bell size={24} className="text-primary" />
            <h3 className="text-xl font-semibold text-foreground">
              Notifications
            </h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <p className="text-sm text-gray-500">
              You have 3 new notifications
            </p>
          </div>
          <ul className="space-y-3 p-4 rounded-lg shadow-md">
            <li className="flex items-center justify-between p-3 rounded-lg transition hover:bg-muted/50">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <p className="text-sm font-medium">New message from a podcast subscriber</p>
              </div>
              <span className="text-xs text-gray-500">5 minutes ago</span>
            </li>

            <li className="flex items-center justify-between p-3 rounded-lg transition hover:bg-muted/50">
              <div className="flex items-center space-x-3">
                <Mic className="w-5 h-5 text-green-500" />
                <p className="text-sm font-medium">New episode &apos;Behind the Mic&apos; is now live</p>
              </div>
              <span className="text-xs text-gray-500">1 hour ago</span>
            </li>

            <li className="flex items-center justify-between p-3 rounded-lg transition hover:bg-muted/50">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <p className="text-sm font-medium">New review posted on Apple Podcasts</p>
              </div>
              <span className="text-xs text-gray-500">3 hours ago</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Performance Overview (Chart) */}
      <Card className="mb-8">
        <CardHeader>
          <h3 className="text-xl font-semibold text-foreground">
            Performance Overview
          </h3>
        </CardHeader>
        <CardContent>
          {/* Icon + Description */}
          <div className="flex items-center space-x-3 mb-4">
            <BarChart2 size={32} className="text-primary" />
            <p className="text-sm text-muted-foreground">
              Visual representation of all podcast episodes and their performance
            </p>
          </div>
          <DashboardChart />
        </CardContent>
      </Card>
      <UserProfile user={user} />
    </div>
  );
};

export default DashboardContent;

/**
 * Note that dummy data was used for the dashboard widgets.
 * Replace this with real data from MongoDB in the future.
 */
