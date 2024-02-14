// leakageController.js

import { getDB } from '../../config/db.js';

export const getLeakageDetails = async (req, res) => {
  try {
    const database = getDB();
    const leakageCollection = database.collection('leakage');

    const apartmentId = req.params.apartmentId;
    const apartmentLeakage = await leakageCollection.findOne({ apartmentId });
    res.json(apartmentLeakage);
  } catch (error) {
    console.error('Error getting leakage details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
