
import { Home } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="bg-primary rounded-md p-1.5 mr-2 shadow-sm">
        <Home className="text-white h-5 w-5" />
      </div>
      <span className="text-gray-800 font-bold text-xl">
        <span className="text-primary">x</span>location
      </span>
    </div>
  );
};

export default Logo;
