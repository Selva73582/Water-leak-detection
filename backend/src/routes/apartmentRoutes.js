// apartmentRoutes.js

import express from 'express';
import { getApartmentById, createApartment } from '../controllers/apartmentController.js';

const router = express.Router();

// Get all apartments
router.get('/:apartmentId', getApartmentById);

// Create a new apartment
router.post('/new', createApartment);

export default router;
