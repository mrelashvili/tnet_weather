import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const WindSpeedChart = ({ windSpeed }) => {
  const data = {
    labels: ['Wind Speed'],
    datasets: [
      {
        data: [windSpeed],
        backgroundColor: ['#36A2EB'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max: 50,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-64 h-16">
        <Bar data={data} options={options} />
      </div>
      <div className="text-center text-lg font-bold mt-2">{windSpeed} km/h</div>
    </div>
  );
};

export default WindSpeedChart;
