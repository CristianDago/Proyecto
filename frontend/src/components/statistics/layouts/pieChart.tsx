// src/components/statistics/pieChart.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { PieChartProps } from "../../../interface/common/statistics";

export const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          // ... más colores
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          // ... más bordes
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>{title}</h2>
      <Pie data={chartData} />
    </div>
  );
};
