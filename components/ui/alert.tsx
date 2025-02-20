"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; 

type AlertProps = {
  message: string;
  type: "success" | "error";
  code?: number; // No default null, just optional
};

const Alert = ({ message, type, code }: AlertProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded-lg shadow-lg text-white font-semibold text-center z-50 transition-opacity duration-500",
        type === "success" ? "bg-green-600" : "bg-red-600"
      )}
    >
      {code && <p className="text-sm opacity-80">Error Code: {code}</p>}
      {message}
    </div>
  );
};

export default Alert;
