const express = require("express");
const router = express.Router();
const db = require("../models");


// API ROUTES
router.post("/api/workouts", (req, res) => {
    db.Workout.create({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
        console.log(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
      req.params.id,
      {
        $push: { exercises: req.body },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  router.get("/api/workouts", (req, res) => {
    db.Workout.find()
      .then((dbWorkout) => {
        res.json(dbWorkout);
        console.log(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .limit(5)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  module.exports = router;