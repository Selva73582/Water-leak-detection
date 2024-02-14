// sensorRoute.js

import express from 'express';
import { saveSensorData, getLastNSensorData } from '../controllers/sensorController.js';

const router = express.Router();

// Define a route for handling POST requests from the ESP8266
router.post('/', saveSensorData);

// Define a route for handling GET requests to retrieve sensor data
router.get('/:apartmentId/:numberOfEntries', getLastNSensorData);

export default router;