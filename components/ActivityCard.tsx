import { RecentActivityType } from "@/types";
import React from "react";

type Activity = {
  recentActivity: RecentActivityType[];
};
const ActivityCard = ({ recentActivity }: Activity) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {recentActivity.map((activity) => (
      <li
      key={activity.id}
      className="flex flex-col bg-white dark:bg-muted/50 rounded-lg p-4 border border-gray-200 dark:border-card-foreground/20 text-card-foreground shadow-md transition-all hover:shadow-lg"
    >
      <div className="text-gray-500 text-sm mb-2">{activity.date}</div>
      <p className="text-base font-medium text-foreground truncate">
        {activity.action}
      </p>
    </li>
    
      ))}
    </ul>
  );
};

export default ActivityCard;
