import { Loader } from "lucide-react";


const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 z-50">
      <div className="relative flex items-center justify-center m-8">
        <Loader className="w-48 h-48 text-white animate-spin absolute text-foreground/20" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
