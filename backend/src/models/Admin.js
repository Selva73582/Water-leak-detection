// Admin.js

import { getDB } from '../../config/db.js';

class Admin {
  constructor(username, password, apartmentId) {
    this.username = username;
    this.password = password;
    this.apartmentId = apartmentId;
  }

  async save() {
    try {
      const database = getDB();
      const adminsCollection = database.collection('admins');
      await adminsCollection.insertOne(this);
    } catch (error) {
      console.error('Error saving admin:', error);
      throw error;
    }
  }
}

export default Admin;
