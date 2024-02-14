import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const DayChart = () => {
  const [dayData, setDayData] = useState([]);
  const [generatedContent, setGeneratedContent] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/chart/daily');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDayData(data);
      generateContent(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generateContent = async (dayData) => {
    try {
      // Show a message while generating AI analysis
      setGeneratedContent("Generating AI analysis...");

      const response = await axios.post('http://localhost:3001/generate', {
        prompt: generatePrompt(dayData)
      });
      // Update the generated content state with the response data
      setGeneratedContent(response.data.generatedContent);
    } catch (error) {
      console.error('Error generating content:', error);
      // If an error occurs, display an error message
      setGeneratedContent("Error generating AI analysis");
    }
  };

  const generatePrompt = (dayData) => {
    return `Generate user-friendly analysis based on the chart data:\n\nDay Data:\n${dayData.map(item => `${item.day}: ${item.totalVolume}`).join('\n')}\n`;
  };

  const labels = dayData.map(item => item.day);
  const data = dayData.map(item => item.totalVolume);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Day Data',
        data: data,
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "black",
        borderWidth: 2,
      }
    ]
  };

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
          text: "Day",
        },
      },
    },
  };

  return (
    <div>
      <h2>User-Friendly Analysis</h2>
      <p>{generatedContent}</p>
      <div style={{ width: "100%", height: "400px" }}>
        <h4>Day Chart</h4>
        {dayData.length > 0 ? (
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

export default DayChart;
