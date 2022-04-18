const express = require('express');
const router = express.Router();

// require the Drone model here

const Drone = require('../models/Drone.model')

router.get('/drones', (req, res, next) => {
  // res.send("hola")
  Drone
    .find()
    .then(drones => {
      console.log("Drone", drones)
      res.render('drones/list', { drones })
    })
    .catch(err => console.log(err))

});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone

  // res.send("hola")

  res.render('drones/create-form')


});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone

  const { name, propellers, maxSpeed } = req.body

  Drone
    .create({ name, propellers, maxSpeed })
    .then(() => {
      res.redirect(`/drones`)
    })
    .catch(err => console.log(err))


});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone

  const { id } = req.params

  Drone
    .findById(id)
    .then(drone => {
      res.render('drones/update-form', drone)
    })
    .catch(err => console.log(err))
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone

  const { id } = req.params

  // res.send(id)

  const { name, propellers, maxSpeed } = req.body

  Drone
    .findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then(() => {
      res.redirect(`/drones`)
    })
    .catch(err => {
      console.log(err)
      res.render('drones/update-form')
    })
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone

  const { id } = req.params

  Drone
    .findByIdAndDelete(id)
    .then(() => {
      res.redirect('/drones')
    })
    .catch(err => console.log(err))

});

module.exports = router;
