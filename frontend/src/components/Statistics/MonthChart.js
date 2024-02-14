import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const MonthChart = () => {
  const [monthData, setMonthData] = useState([]);
  const [generatedContent, setGeneratedContent] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/chart/monthly');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMonthData(data);
      generateContent(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generateContent = async (monthData) => {
    try {
      const response = await axios.post('http://localhost:3001/generate', {
        prompt: generatePrompt(monthData)
      });
      // setGeneratedContent(response.data.generatedContent.split('\n').map((point, index) => <p key={index}>{point}</p>))
      setGeneratedContent(response.data.generatedContent);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  const generatePrompt = (monthData) => {
    return `Generate user-friendly analysis based on the chart data:\n\nMonth Data:\n${monthData.map(item => `${item.month}: ${item.totalVolume}`).join('\n')}\n`;
  };

  const chartData = formatData(monthData);

  const options = {
    scales: {
      y: {
        min: 0,
        title: {
          display: true,
          text: "Volume",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
    },
  };

  return (
    <div>
      <h2>User-Friendly Analysis for Monthly Chart</h2>
      <p>{generatedContent}</p>
      <div style={{ width: "100%", height: "400px" }}>
        <h4>Month Chart</h4>
        {monthData.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <h4 className='text-primary'>Loading...</h4>
          </div>
        )}
      </div>
    </div>
  );
};

const formatData = (monthData) => {
  const labels = monthData.map(item => item.month);
  const data = monthData.map(item => item.totalVolume);
  return { labels, datasets: [{ data : data, label: 'Month Data', backgroundColor: ["rgba(75,192,192,1)"],
  borderColor: "black",
  borderWidth: 2,} ] };
};

export default MonthChart;
