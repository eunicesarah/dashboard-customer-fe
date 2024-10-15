"use client";

import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

// Dynamic import to prevent SSR issues with ApexCharts
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type SentimentData = {
  positive: number;
  negative: number;
  neutral: number;
};

const ChartTwo: React.FC = () => {
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]); // Fixed type

  // Fetch sentiment data from API
  const fetchSentimentData = async () => {
    try {
      const response = await axios.get<SentimentData>(
        "https://dashboard-customer-be-1.vercel.app/api/sentiment-analyst/getCount",
      );
      const data = response.data;

      // Transform the data to match ApexChart's expected series format
      const transformedSeries = [
        {
          name: "Sentiment",
          data: [data.positive, data.negative, data.neutral], // Pass the correct data format
        },
      ];

      setSeries(transformedSeries);
    } catch (error) {
      console.error("Error fetching sentiment data:", error);
    }
  };

  useEffect(() => {
    fetchSentimentData();
  }, []);

  // ApexChart options
  const options: ApexOptions = {
    colors: ["#3C50E0", "#FF5733", "#80CAEE"], // Define the colors for the bars
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar", // Chart type: bar
    },
    plotOptions: {
      bar: {
        horizontal: false, // Vertical bars
      },
    },
    xaxis: {
      categories: ["Positive", "Negative", "Neutral"], // Define the categories for the x-axis
    },
    labels: ["Positive", "Negative", "Neutral"], // Define labels
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Sentiment Analysis
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={options}
            series={series} // Pass the series here
            type="bar"
            height={350}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
