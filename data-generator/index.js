// import { MongoClient } from 'mongodb';

// // MongoDB connection URI
// const mongoURI = 'mongodb+srv://pugalkmc:pugalkmc@cluster0.dzcnjxc.mongodb.net/';
// const dbName = 'water-leak';
// const collectionName = 'sensorData';

// // Function to connect to MongoDB
// const connectToMongoDB = async () => {
//   const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//   await client.connect();
//   return client.db(dbName).collection(collectionName);
// };

// // Function to generate random timestamp for the past 100 days
// const generateRandomTimestamp = () => {
//   const startDate = new Date();
//   startDate.setDate(startDate.getDate() - 100); // 100 days ago
//   const endDate = new Date();
//   const randomTimestamp = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
//   return randomTimestamp.toISOString();
// };

// // Function to generate random sensor data
// const generateRandomSensorData = () => {
//   const data = [];
//   for (let i = 0; i < 100; i++) { // For each day
//     for (let j = 1; j <= 4; j++) { // For each sensor
//       for (let k = 0; k < 8000; k++) { // Generate 8000 data points for each sensor each day
//         data.push({
//           apartmentId: '65b0de6cee33a7c611308669', // Apartment ID
//           sensorId: j, // Sensor ID
//           volume: Math.floor(Math.random() * 100), // Random volume between 0 and 100
//           averageFlowRate: Math.random() * 10, // Random average flow rate
//           floorNumber: j, // Floor number equal to sensor ID
//           timestamp: generateRandomTimestamp()
//         });
//       }
//     }
//     console.log(`${i+1} Day`);
//   }
//   return data;
// };

// // Function to insert random sensor data into MongoDB
// const insertRandomSensorData = async () => {
//   try {
//     const collection = await connectToMongoDB();
//     const dataToInsert = generateRandomSensorData(); // Generate random sensor data
//     await collection.insertMany(dataToInsert);
//     console.log('Random sensor data inserted successfully.');
//   } catch (err) {
//     console.error('Error inserting random sensor data:', err);
//   }
// };

// // Insert random sensor data
// insertRandomSensorData();

import { MongoClient } from 'mongodb';

// MongoDB connection URI
const mongoURI = 'mongodb+srv://pugalkmc:pugalkmc@cluster0.dzcnjxc.mongodb.net/';
const dbName = 'water-leak';
const collectionName = 'sensorData-1';

// Function to connect to MongoDB
const connectToMongoDB = async () => {
  const client = new MongoClient(mongoURI);
  await client.connect();
  return client.db(dbName).collection(collectionName);
};


// Function to generate timestamp for a given date
const generateTimestamp = (date) => {
  const timestamp = new Date(date);
  return timestamp.toISOString();
};

// Function to generate sensor data for the tank sensor for a specific date
const generateTankSensorDataForDate = (date) => {
  return {
    apartmentId: "65b0de6cee33a7c611308669", // Adjust apartmentId as needed
    sensorId: 4, // Tank sensor ID
    volume: Math.floor(Math.random() * 1000), // Random volume between 0 and 1000
    timestamp: generateTimestamp(date),
    floorNumber: 4 // Floor number of the tank sensor
  };
};

// Function to insert tank sensor data for a specific date
const insertTankSensorDataForDate = async (date) => {
  try {
    const collection = await connectToMongoDB();
    const dataToInsert = generateTankSensorDataForDate(date); // Generate tank sensor data for the date
    await collection.insertOne(dataToInsert);
    console.log(`Tank sensor data inserted for date: ${date}`);
  } catch (err) {
    console.error('Error inserting tank sensor data:', err);
  }
};

// Function to generate tank sensor data for a range of dates
const generateAndInsertTankSensorDataForRange = async () => {
  const endDate = new Date(); // Today's date
  endDate.setHours(0, 0, 0, 0); // Set time to midnight
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 100); // 100 days ago

  let currentDate = new Date(startDate);
  while (currentDate < endDate) {
    await insertTankSensorDataForDate(currentDate);
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    console.log(currentDate);
  }
};

// Insert tank sensor data for the range of dates
generateAndInsertTankSensorDataForRange();

