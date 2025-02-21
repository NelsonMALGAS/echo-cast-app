import { Headphones, Mic } from "lucide-react";

type LoadingSpinnerProps = {
  message?: string;
};

const LoadingSpinner = ({ message = "Loading..." }: LoadingSpinnerProps) => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 z-50">
      <div className="relative flex items-center justify-center m-8">
        <Headphones className="w-48 h-48 text-white animate-pulse absolute" />
      </div>
      <p className="text-white text-lg font-semibold mt-16 animate-fade-in">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
