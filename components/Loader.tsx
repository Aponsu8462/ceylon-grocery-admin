import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="relative">
        <div className="absolute top-0 left-0 h-full w-full border-4 border-solid border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        <div className="h-8 w-8 border-4 border-solid border-blue-500 rounded-full"></div>
      </div>
      <span className="text-lg font-medium text-blue-500">Loading...</span>
    </div>
  );
};

export default Loader;
