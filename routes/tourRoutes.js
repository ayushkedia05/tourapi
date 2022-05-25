const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.uploadTourimage,tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.uploadTourimage,tourController.resizeTourimages ,tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
