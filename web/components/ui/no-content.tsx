import React, { ReactNode } from "react";
import { ServerCrashIcon } from "lucide-react";
interface NoContentProps {
  children?: ReactNode; // children is optional and can be any valid React node
}

const NoContent: React.FC<NoContentProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[500px]">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <ServerCrashIcon className="h-12 w-12 text-gray-400" />
        <p className="text-md text-gray-500">{children}</p>
      </div>
    </div>
  );
};

export default NoContent;
