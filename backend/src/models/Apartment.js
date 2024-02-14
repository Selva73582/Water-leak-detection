// Apartment.js

import { getDB } from '../../config/db.js';

class Apartment {
  constructor(name, floors, sensors, admins) {
    this.name = name;
    this.floors = floors;
    this.sensors = sensors;
    this.admins = admins;
  }

  async save() {
    try {
      const database = getDB();
      const apartmentsCollection = database.collection('apartments');
      await apartmentsCollection.insertOne(this);
    } catch (error) {
      console.error('Error saving apartment:', error);
      throw error;
    }
  }
}

export default Apartment;
