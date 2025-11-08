"use client";

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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FeelingLineChart = () => {
  // 더미 데이터
  const moodData: Record<string, string> = {
    "2025-11-01": "😀",
    "2025-11-02": "😢",
    "2025-11-03": "😡",
    "2025-11-04": "😴",
    "2025-11-05": "😊",
  };

  // 기분 숫자로 변환
  const moodToNumber = (mood: string): number => {
    const moodScale: Record<string, number> = {
      "😢": 1,
      "😡": 2,
      "😴": 3,
      "😊": 4,
      "😀": 5,
    };
    return moodScale[mood] || 3;
  };

  // 차트 데이터
  const dates = Object.keys(moodData).sort();
  const feelings = dates.map((date) => moodToNumber(moodData[date]));
  const labels = dates.map((date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "기분",
        data: feelings,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "감정 그래프",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: function (value: string | number) {
            const moodLabels = {
              1: "😢",
              2: "😡",
              3: "😴",
              4: "😊",
              5: "😀",
            };
            return moodLabels[value as keyof typeof moodLabels] || value;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-96 p-4">
      <Line data={data} options={options} />
    </div>
  );
};

export default FeelingLineChart;
