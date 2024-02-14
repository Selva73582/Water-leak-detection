// Import necessary modules
import cron from 'node-cron';
import axios from 'axios';
import { getDB } from '../../config/db.js';

// Function to predict leaks and update sensor status
const predictLeaksAndNotify = async () => {
  try {
    // Fetch sensor data from MongoDB (assuming you have a 'sensorData' collection)
    const database = getDB();
    const sensorDataCollection = database.collection('sensorData');

    // Assume you have a method to get the latest sensor data for each sensor
    const latestSensorData = await getLatestSensorData(sensorDataCollection);

    // Prepare data for ML model (adjust based on your model's input format)
    const mlInputData = latestSensorData.map((sensor) => ({
      sensorId: sensor.sensorId,
      volume: sensor.volume,
      averageFlowRate: sensor.averageFlowRate,
      floorNumber: sensor.floorNumber,
    }));

    const requestData = {
      Timestamp: "2024-01-29 10:10:02",
      Average_Water_Flow_Tank: 0.5,
      Total_Volume_Flown_Tank: 100.0,
      Average_Water_Flow_Floor3: 0.4,
      Total_Volume_Flown_Floor3: 80.0,
      Average_Water_Flow_Floor2: 0.3,
      Total_Volume_Flown_Floor2: 60.0,
      Average_Water_Flow_Floor1: 0.2,
      Total_Volume_Flown_Floor1: 40.0,
      Leaking_Floors: 0
    };

    // Make a POST request to the ML prediction API
    const mlApiResponse = await axios.post('https://localhost:3002/detect_leak', mlInputData);
    console.log(mlApiResponse)

    // Create a new collection for leak detection information
    const leakDetectionCollection = database.collection('leakDetection');

    // Update sensor status and last leak detection time in the new collection
    mlApiResponse.data.forEach(async (prediction, index) => {
      const sensorId = latestSensorData[index].sensorId;

      await leakDetectionCollection.insertOne({
        sensorId,
        leakDetected: prediction.leakDetected,
        lastLeakDetectionTime: new Date(),
      });
    });

    console.log('Leak predictions and updates completed successfully.');
  } catch (error) {
    console.error('Error predicting leaks and updating sensor status:', error);
  }
};

// Schedule the function to run every minute
cron.schedule('* * * * *', predictLeaksAndNotify);

// Function to get the latest sensor data for each sensor
const getLatestSensorData = async (sensorDataCollection) => {
  // Implement your logic to fetch the latest sensor data for each sensor
  // For example, you can use MongoDB aggregation to get the latest entry for each sensor
  const latestSensorData = await sensorDataCollection
    .aggregate([
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: '$sensorId',
          latestEntry: { $first: '$$ROOT' },
        },
      },
      {
        $replaceRoot: { newRoot: '$latestEntry' },
      },
    ])
    .toArray();

  return latestSensorData;
};

// Export the function for reuse (if needed)
// export { predictLeaksAndNotify };
