
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <>
      <div className="flex items-center mb-5">
        <Skeleton className="w-[100px] h-[100px] rounded-full" />
        <div className="ml-5">
          <Skeleton className="w-[150px] h-[20px]" />
          <Skeleton className="w-[100px] h-[20px] mt-2" />
        </div>
      </div>
      <Skeleton className="w-full h-[100px] mt-4" />
      <Skeleton className="w-full h-[400px] mt-4" />

    </>
  );
};

export default SkeletonLoader;