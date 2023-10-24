import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Project Monthly Status",
    },
  },
};

const labels = ["February", "March", "April", "May"];

export const data = {
  labels,
  datasets: [
    {
      label: "Meetings",
      data: [3, 2, 8, 10],
      backgroundColor: "#EA4D88",
    },
  ],
};

export function BarChart() {
  return <Bar options={options} data={data} />;
}
