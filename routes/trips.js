const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

// GET all trips
router.get('/', tripController.getAllTrips);

// GET single trip
router.get('/:id', tripController.getTrip);

// POST new trip
router.post('/', tripController.createTrip);

// PUT update trip
router.put('/:id', tripController.updateTrip);

// DELETE trip
router.delete('/:id', tripController.deleteTrip);

module.exports = router;
