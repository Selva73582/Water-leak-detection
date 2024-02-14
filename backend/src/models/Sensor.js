// Sensor.js

import { getDB } from '../../config/db.js';

class Sensor {
  constructor(floorNumber, flowRate, dateAdded) {
    this.floorNumber = floorNumber;
    this.flowRate = flowRate;
    this.dateAdded = dateAdded;
  }

  async save() {
    try {
      const database = getDB();
      const sensorsCollection = database.collection('sensors');
      await sensorsCollection.insertOne(this);
    } catch (error) {
      console.error('Error saving sensor:', error);
      throw error;
    }
  }
}

export default Sensor;
