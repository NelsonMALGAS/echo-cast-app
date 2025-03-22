"use client";

import { motion } from "framer-motion";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { Home, Settings, User, Bell, BarChart2 } from "lucide-react"; 
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"; 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; 
import { Separator } from "@/components/ui/separator"; // For separating sections
import DashboardChart from "./DashboardChartToggle";
import ActivityCard from "./ActivityCard";
import { RecentActivityType } from "@/types";

const DashboardContent = () => {
  const { loading, user } = useAuth();

  // Dummy data for dashboard widgets (replace this later with real MongoDB data)
  const stats = {
    totalOrders: 150,
    totalRevenue: 5000,
    newMessages: 12,
  };
  const recentActivity: RecentActivityType[] = [
    { id: 1, action: "Order #1245 placed", date: "2025-03-19" },
    { id: 2, action: "Message from Support", date: "2025-03-18" },
    { id: 3, action: "Payment received", date: "2025-03-17" },
    { id: 4, action: "Order #1246 shipped", date: "2025-03-16" },
    { id: 5, action: "Password changed", date: "2025-03-15" },
    { id: 6, action: "New review posted", date: "2025-03-14" },
    { id: 7, action: "Subscription renewed", date: "2025-03-13" },
    { id: 8, action: "Order #1247 placed", date: "2025-03-12" },
    { id: 9, action: "Item added to wishlist", date: "2025-03-11" },
    { id: 10, action: "Discount applied to order", date: "2025-03-10" },
  ];
  

  const tasks = [
    { _id: 1, invoice: "#INV-001", status: "Pending", method: "Credit Card", amount: "$250.00" },
    { _id: 2, invoice: "#INV-002", status: "Completed", method: "PayPal", amount: "$120.50" },
    { _id: 3, invoice: "#INV-003", status: "In Progress", method: "Bank Transfer", amount: "$320.75" },
    { _id: 4, invoice: "#INV-004", status: "Pending", method: "Cash", amount: "$50.00" },
    { _id: 5, invoice: "#INV-005", status: "Completed", method: "Crypto", amount: "$540.30" },
    { _id: 6, invoice: "#INV-006", status: "Pending", method: "Debit Card", amount: "$80.20" },
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
         <span className="text-3xl mt-8"> Welcome {user?.displayName ? user?.displayName : user?.displayName}</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Total Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Home size={32} className="text-primary" />
              <h3 className="text-xl font-semibold">Total Orders</h3>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
          </CardContent>
        </Card>

        {/* Card 2: Total Revenue */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <User size={32} className="text-primary" />
              <h3 className="text-xl font-semibold">Total Revenue</h3>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${stats.totalRevenue}</p>
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
          <h3 className="text-xl font-semibold text-foreground">Recent Activity</h3>
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
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
    <TableBody>
        {tasks.map((task) =>(
            <TableRow key={task._id}>
                <TableCell className="font-medium">{task.invoice}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.method}</TableCell>
                <TableCell className="text-right">{task.amount}</TableCell>
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
            <h3 className="text-xl font-semibold text-foreground">Notifications</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <p className="text-sm text-gray-500">You have 3 new notifications</p>
          </div>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <p className="text-sm">New message from customer service</p>
              <span className="text-xs text-gray-400">5 minutes ago</span>
            </li>
            <li className="flex justify-between items-center">
              <p className="text-sm">Order #1245 is confirmed</p>
              <span className="text-xs text-gray-400">1 hour ago</span>
            </li>
            <li className="flex justify-between items-center">
              <p className="text-sm">New review posted on your product</p>
              <span className="text-xs text-gray-400">3 hours ago</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Performance Overview (Chart) */}
     <Card className="mb-8">
  <CardHeader>
    <h3 className="text-xl font-semibold text-foreground">Performance Overview</h3>
  </CardHeader>
  <CardContent>
    {/* Icon + Description */}
    <div className="flex items-center space-x-3 mb-4">
      <BarChart2 size={32} className="text-primary" />
      <p className="text-sm text-muted-foreground">
        Visual representation of your performance
      </p>
    </div>
      <DashboardChart />
  </CardContent>
</Card>


      {/* User Profile */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold text-foreground">User Profile</h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-300"></div>
            <div>
              <h4 className="text-lg font-semibold">{user?.email}</h4>
              <p className="text-sm text-gray-500">Member since 2023</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link  href="/#" className="w-full cursor-none">
             Profile
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardContent;

/**
 * Note that dummy data was used for the dashboard widgets.
 * Replace this with real data from MongoDB in the future.
 */
