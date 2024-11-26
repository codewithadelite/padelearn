import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MaterialsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="flex justify-between items-center ">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-8 w-[35px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MaterialsSkeleton;
