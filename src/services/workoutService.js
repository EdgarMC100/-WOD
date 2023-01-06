const { v4: uuid } = require("uuid");
const workoutDA = require("../database/workout");

const getAllWorkouts = () => {
  const allWorkouts = workoutDA.getAllWorkouts();
  return allWorkouts;
};

const getOneWorkout = (id) => {
  let workout = workoutDA.getOneWorkout(id);
  if (workout) {
    return workout;
  }
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

const updateOneWorkout = (workoutId, changes) => {
  const updatedWorkout = workoutDA.updateOneWorkout(workoutId, changes);
  return updatedWorkout;
};

const deleteWorkout = (workoutId) => {
  const workoutDeleted = workoutDA.deleteWorkout(workoutId);
  return workoutDeleted;
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteWorkout,
};
