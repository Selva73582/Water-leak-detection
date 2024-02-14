const axios = require('axios');

// Function to generate random sensor data
const generateRandomSensorData = () => {
  const apartmentId = "65b0de6cee33a7c611308669";
  const sensorId = Math.floor(Math.random() * 4) + 1; // Random sensor ID between 1 and 4
  const volume = Math.floor(Math.random() * 100) + 1; // Random volume between 1 and 100
  const averageFlowRate = Math.floor(Math.random() * 50) + 1; // Random average flow rate between 1 and 50
  const floorNumber = Math.floor(Math.random() * 3) + 1; // Random floor number between 1 and 3
  
  return {
    apartmentId,
    sensorId,
    volume,
    averageFlowRate,
    floorNumber
  };
};

// Function to post sensor data every 3 seconds
const postSensorData = async () => {
  try {
    const sensorData = generateRandomSensorData();
    await axios.post('http://localhost:3001/sensor-data/', sensorData);
    console.log('Sensor data posted successfully:', sensorData);
  } catch (error) {
    console.error('Error posting sensor data:', error);
  }
};

// Schedule posting sensor data every 3 seconds
setInterval(postSensorData, 1000);
