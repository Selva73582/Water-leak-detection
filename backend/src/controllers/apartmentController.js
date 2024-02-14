// apartmentController.js

import { ObjectId } from 'mongodb';
import { getDB } from '../../config/db.js';

export const getApartmentById = async (req, res) => {
  try {
    const apartmentId = new ObjectId(req.params.apartmentId);  // Use ObjectId to create instance
    const database = getDB();
    const apartmentsCollection = database.collection('apartments');
    const apartment = await apartmentsCollection.findOne({ _id: apartmentId });
    if (apartment) {
      res.json(apartment);
    } else {
      res.status(404).json({ message: 'Apartment not found' });
    }
  } catch (error) {
    console.error('Error getting apartment details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createApartment = async (req, res) => {
  try {
    const database = getDB();
    const apartmentsCollection = database.collection('apartments');
    const managersCollection = database.collection('managers');

    const newApartment = req.body;
    
    // Insert the new apartment
    const apartmentResult = await apartmentsCollection.insertOne(newApartment);
    const apartmentId = apartmentResult.insertedId;

    // Extract managers from the request body
    const managers = newApartment.managers;

    // Insert each manager with the associated apartmentId
    const insertedManagers = await Promise.all(
      managers.map(async (manager) => {
        manager.apartmentId = apartmentId;
        const result = await managersCollection.insertOne(manager);
        return result.insertedId;
      })
    );

    res.json({ message: 'Apartment created successfully', apartmentId, insertedManagers });
  } catch (error) {
    console.error('Error creating apartment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
