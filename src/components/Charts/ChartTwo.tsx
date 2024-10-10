"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  colors: ["#3C50E0", "#FF5733", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 335,
    stacked: false, // Ubah ke false agar bar tidak menumpuk
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "50%", // Lebar bar 50% untuk setiap kategori
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["Positive", "Negative", "Neutral"],
  },
  yaxis: {
    min: 0,
    max: 300, // Set maksimal ke 300 agar sesuai dengan request
    tickAmount: 6, // Bagi skala menjadi 6 bagian
    labels: {
      formatter: (val) => `${val}`, // Tambahkan formatter jika ingin custom label
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",
    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

const ChartTwo: React.FC = () => {
  const series = [
    {
      name: "Positive",
      data: [310, 0, 0], // Tinggi untuk kategori 'Positive' (150) dan 0 untuk lainnya
    },
    {
      name: "Negative",
      data: [0, 20, 0], // Tinggi untuk kategori 'Negative' (100)
    },
    {
      name: "Neutral",
      data: [0, 0, 50], // Tinggi untuk kategori 'Neutral' (250)
    },
  ];

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
            series={series}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
