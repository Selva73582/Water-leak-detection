// leakageRoutes.js

import express from 'express';
import { getLeakageDetails } from '../controllers/leakageController.js';

const router = express.Router();

// Get leakage details for a specific apartment
router.get('/:apartmentId', getLeakageDetails);

export default router;
