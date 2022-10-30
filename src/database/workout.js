const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = () => {
  return DB.workouts;
};

const compareWorkouts = (workout, newWorkout) => {
  return workout.name === newWorkout.name;
};

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => compareWorkouts(workout, newWorkout)) >
    -1;
  if (isAlreadyAdded) {
    return;
  }
  DB.workouts.push(newWorkout);
  saveToDatabase(DB);
  return newWorkout;
};
module.exports = { getAllWorkouts, createNewWorkout };
