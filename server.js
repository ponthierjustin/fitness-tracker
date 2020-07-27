const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const path = require("path");

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

app.put("/api/workouts", (req, res) => {
  db.Workout.findByIdAndUpdate(
    params.id,
    {
      $push: { exercises: body },
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

app.get("/api/workouts", (req, res) => {
  db.Workout.find()
    .then((dbWorkout) => {
      res.json(dbWorkout);
      console.log(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
