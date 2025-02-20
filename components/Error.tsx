"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type ErrorProps = {
  code: number;
  message: string;
};

const ErrorComponent = ({ code, message }: ErrorProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-5xl font-bold text-destructive">Error {code}</h1>
      <p className="text-lg text-muted-foreground mt-2">{message}</p>

      {/* Go Back Button */}
      <Button
        onClick={() => router.back()}
        className="mt-6 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg"
      >
        Go Back
      </Button>
    </div>
  );
};

export default ErrorComponent ;
