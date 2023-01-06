const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = () => {
  return DB.workouts;
};

const compareWorkouts = (workout, newWorkout) => {
  return workout.name === newWorkout.name;
};
const getOneWorkout = (id) => {
  return DB.workouts.find((workout) => workout.id == id);
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

const deleteWorkout = (id) => {
  console.log(DB.workouts);
  console.log(id);
  const workoutsFiltered = DB.workouts.filter((workout) => workout.id !== id);
  if (workoutsFiltered.length > 0) {
    setTimeout(() => {
      const newDB = { workouts: workoutsFiltered };
      saveToDatabase(newDB);
    }, 0);
    return DB.workouts.find((workout) => workout.id === id);
  }
  //or
  // const indexForDeletion = DB.workouts.findIndex(
  //   (workout) => workout.id === id
  // );
  // if (indexForDeletion === -1) {
  //   return;
  // }
  // DB.workouts.splice(indexForDeletion, 1)
  //
  return;
};

const updateOneWorkout = (workoutId, changes) => {
  const indexForUpdate = DB.workouts.findIndex(
    (workout) => workout.id === workoutId
  );

  if (indexForUpdate === -1) {
    return;
  }
  const updatedWorkout = {
    ...DB.workouts[indexForUpdate],
    ...changes,
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  DB.workouts[indexForUpdate] = updatedWorkout;
  saveToDatabase(DB);
  return updatedWorkout;
};

module.exports = {
  getAllWorkouts,
  createNewWorkout,
  getOneWorkout,
  deleteWorkout,
  updateOneWorkout,
};
