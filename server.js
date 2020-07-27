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

// HTML ROUTES
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});
app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

// API ROUTES
app.post("/api/workouts", (req, res) => {
  db.Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
      console.log(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", (req, res) => {
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

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .limit(5)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
