"use client";
import ChartTwo from "@/components/Charts/ChartTwo";
import ChartFour from "@/components/Charts/ChartFour";
import dynamic from "next/dynamic";
import React from "react";

const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const Chart: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartTwo />
        <ChartThree />
      </div>
      <div className="mt-5">
        <ChartFour />
      </div>
    </>
  );
};

export default Chart;
