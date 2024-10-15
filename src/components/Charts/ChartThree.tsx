"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useState, useEffect } from "react";
import { Percentages } from "../../types/Count"; // Import the Percentages type

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ChartThree: React.FC = () => {
  const [series, setSeries] = useState<ApexNonAxisChartSeries>([]);

  const [categories, setCategories] = useState<string[]>([]);

  const fetchSentimentData = async () => {
    try {
      const response = await axios.get(
        "https://dashboard-customer-be-1.vercel.app/api/sentiment-analyst/getPercentage",
      );
      const data: Percentages = response.data.percentages;

      const transformedSeries = [
        data.positive, data.negative, data.neutral,
      ];

      const categoriesLabels = ["Positive", "Negative", "Neutral"]; // Define the categories labels
      setCategories(categoriesLabels); // Set the categories

      console.log(transformedSeries);
      setSeries(transformedSeries);
    } catch (error) {
      console.error("Error fetching sentiment data:", error);
    }
  };

  useEffect(() => {
    fetchSentimentData();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: categories, // Use the state variable here
    },
    labels: categories, // Add labels for the donut chart
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Sentiment Analysis
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div
          id="chartThree"
          className="mx-auto flex justify-center"
          style={{ width: "100%", height: "100%" }}
        >
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            height={800} // Atur height agar chart memiliki ruang cukup
            width={400} // Pastikan lebar penuh
          />
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
