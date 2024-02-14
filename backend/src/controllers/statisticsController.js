// statisticsController.js

import { getDB } from '../../config/db.js';

export const getApartmentStatistics = async (req, res) => {
  try {
    const database = getDB();
    const statisticsCollection = database.collection('statistics');

    const apartmentId = req.params.apartmentId;
    const apartmentStatistics = await statisticsCollection.findOne({ apartmentId });
    res.json(apartmentStatistics);
  } catch (error) {
    console.error('Error getting statistics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}