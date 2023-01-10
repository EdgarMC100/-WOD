const { v4: uuid } = require("uuid");
const workoutDA = require("../database/workout");

const getAllWorkouts = () => {
  try {
    const allWorkouts = workoutDA.getAllWorkouts();
    return allWorkouts;
  } catch (error) {
    throw error;
  }
};

const getOneWorkout = (id) => {
  try {
    let workout = workoutDA.getOneWorkout(id);
    return workout;
  } catch (error) {
    throw error;
  }
};

const createNewWorkout = (workout) => {
  const workoutToInsert = {
    ...workout,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  try {
    const createdWorkout = workoutDA.createNewWorkout(workoutToInsert);
    return createdWorkout;
  } catch (error) {
    throw error;
  }
};

const updateOneWorkout = (workoutId, changes) => {
  try {
    const updatedWorkout = workoutDA.updateOneWorkout(workoutId, changes);
    return updatedWorkout;
  } catch (error) {
    throw error;
  }
};

const deleteWorkout = (workoutId) => {
  try {
    const workoutDeleted = workoutDA.deleteWorkout(workoutId);
    return workoutDeleted;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteWorkout,
};
