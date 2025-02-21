"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NotAuthenticated = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <Card className="w-full max-w-md text-center shadow-md">
        <CardHeader>
          <div className="flex justify-center">
            <div className="bg-red-100 dark:bg-red-900 p-4 rounded-full">
              <Lock className="w-12 h-12 text-red-500 dark:text-red-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold mt-4">
            Access Denied
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You must be logged in to view this content.
          </p>

          {/* Login Button using Next.js Link */}
          <Link href="/login" passHref>
            <Button className="mt-6 w-full">Go to Login</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotAuthenticated;
