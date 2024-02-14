// statisticsRoutes.js

import express from 'express';
import { getApartmentStatistics } from '../controllers/statisticsController.js';

const router = express.Router();

// Get statistics for a specific apartment
router.get('/:apartmentId', getApartmentStatistics);

export default router;
