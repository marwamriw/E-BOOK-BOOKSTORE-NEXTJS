import React from "react";
import { FadeLoader } from "react-spinners";

const LoadingSpinners = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <FadeLoader color="#4A90E2" />
      </div>
    </div>
  );
};

export default LoadingSpinners;
