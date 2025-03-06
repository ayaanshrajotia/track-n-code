"use client";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineGraph = () => {
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                grid: {
                    color: "rgba(255, 255, 255, 0.1)", // Light grid for dark mode
                },
                ticks: {
                    color: "#ffffff", // White labels
                    font: {
                        family: "DM Sans",
                    },
                },
            },
            y: {
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                    color: "#ffffff",
                    font: {
                        family: "DM Sans",
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "#222", // Dark background tooltip
                titleColor: "#fff",
                bodyColor: "#ddd",
            },
        },
        elements: {
            line: {
                tension: 0.1, // Smooth line
            },
            point: {
                radius: 5,
                backgroundColor: "#fff",
                borderColor: "#1DB954", // Accent color for points
                borderWidth: 2,
            },
        },
    };

    const data = {
        labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
        datasets: [
            {
                data: [32, 45, 12, 76, 69, 23, 45],
                borderColor: "#1DB954", // Green contrast
                borderWidth: 3,
                fill: false,
                backgroundColor: "rgba(29, 185, 84, 0.2)",
            },
        ],
    };

    return (
        <div className="h-[280px] w-full p-4 bg-tnc-black rounded-[20px] shadow-md">
            <Line options={options} data={data} />
        </div>
    );
};

export default LineGraph;
