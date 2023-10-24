import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,

  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      marginBottom: "10px",
    },
  },
};
function doughnutData(value) {
  return {
    labels: ["Happy", "Sad", "Surprise", "Angry", "Disgust", "Neutral", "Fear"],
    datasets: [
      {
        label: "# of Votes",

        data: value,
        backgroundColor: [
          "#EA4D88",
          "#6573FB",
          "rgba(255, 206, 86, 0.6)",
          "#BE3012",
          "#66DD11",
          "#0FABE5",
          "#E50FAF",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
}

export function DoughnutChart({ data }) {
  return <Doughnut data={{ ...doughnutData(data) }} options={options} />;
}
