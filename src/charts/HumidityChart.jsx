import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

const HumidityChart = ({ humidity, width }) => {
  const data = {
    labels: ['Humidity', 'Remaining'],
    datasets: [
      {
        data: [humidity, 100 - humidity],
        backgroundColor: ['#36A2EB', '#EEEEEE'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '99%',
    rotation: Math.PI * -0.5,
    circumference: Math.PI,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div style={{ width: '50px', height: '50px' }}>
        <Doughnut data={data} options={options} />
      </div>
      <div className="text-center text-lg font-bold mt-2">{humidity}%</div>
    </div>
  );
};

export default HumidityChart;
