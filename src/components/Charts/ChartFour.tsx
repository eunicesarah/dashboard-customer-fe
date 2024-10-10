"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useState, useEffect } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

type ChartData = {
    word: string;
    frequency: number;
};

const ChartFour: React.FC = () => {
    const [series, setSeries] = useState<ApexAxisChartSeries | ApexNonAxisChartSeries>([]);
    const [categories, setCategories] = useState<string[]>([]);

    const fetchWordCloud = async () => {
        try {
            const response = await axios.get('https://dashboard-customer-be-1.vercel.app/api/word-cloud'); // Use the full URL to the backend
            const data: ChartData[] = response.data;

            const transformedSeries = [{
                name: "Frequency",
                data: data.map(item => item.frequency),
            }];

            const words = data.map(item => item.word);
            setCategories(words); // Set the categories

            console.log(transformedSeries);
            setSeries(transformedSeries);
        } catch (error) {
            console.error("Error fetching word cloud:", error);
        }
    };

    useEffect(() => {
        fetchWordCloud();
    }, []);

    const options: ApexOptions = {
        chart: {
            type: "bar",
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        xaxis: {
            categories: categories, // Use the state variable here
        },
    };

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
            <div className="mb-4 justify-between gap-4 sm:flex">
                <div>
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Word Cloud
                    </h4>
                </div>
            </div>

            <div>
                <div id="chartTwo" className="-mb-9 -ml-5">
                    <ReactApexChart
                        options={options}
                        series={series}
                        type="bar"
                        width={"100%"}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChartFour;
