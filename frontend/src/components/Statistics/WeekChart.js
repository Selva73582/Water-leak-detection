import React from 'react';
import { Line } from 'react-chartjs-2';

const WeekChart = ({ weekData }) => {
  // Implement rendering logic for WeekChart with provided weekData or generate random data
  const chartData = weekData.length || generateRandomData();

  const options = {
    scales: {
      x: [
        {
          title: {
            display: true,
            text: 'Week',
          },
          type: 'category',
          grid: {
            display: true,
          },
        },
      ],
      y: [
        {
          title: {
            display: true,
            text: 'Value',
          },
          grid: {
            display: true,
          },
        },
      ],
    },
  };

  return (
    <div style={{ width: "70%", height: "400px" }}>
      <h4 style={{ textAlign: 'center', margin: '10px 0', color: '#333', fontWeight: 'bold' }}>Week Chart</h4>
      {chartData && chartData.labels && chartData.datasets ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>No data available for Week Chart</p>
      )}
    </div>
  );
};

// Function to generate random chart data for demonstration
const generateRandomData = () => {
  const labels = Array.from({ length: 20 }, (_, i) => `Week ${i + 1}`);
  const data = Array.from({ length: 20 }, () => Math.floor(Math.random() * 50));
  return { labels, datasets: [{ label: 'Week Data', data }] };
};

export default WeekChart;
