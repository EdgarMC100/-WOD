const { v4: uuid } = require("uuid");
const workoutDA = require("../database/workout");

const getAllWorkouts = () => {
  const allWorkouts = workoutDA.getAllWorkouts();
  return allWorkouts;
};

const getOneWorkout = () => {
  return;
};

const createNewWorkout = (workout) => {
  const workoutToInsert = {
    ...workout,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  const createdWorkout = workoutDA.createNewWorkout(workoutToInsert);
  return createdWorkout;
};

const updateOneWorkout = () => {
  return;
};

const deleteOneWorkout = () => {
  return;
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
