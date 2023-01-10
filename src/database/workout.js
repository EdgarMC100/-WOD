const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = () => {
  try {
    return DB.workouts;
  } catch (error) {
    throw { status: 404, message: error.message };
  }
};

const compareWorkouts = (workout, newWorkout) => {
  return workout.name === newWorkout.name;
};
const getOneWorkout = (id) => {
  const workout = DB.workouts.find((workout) => workout.id == id);
  if (!workout) {
    throw { status: 404, message: `Workout with the id: ${id} not found` };
  }
  return workout;
};

/*
  A little downside of just throwing is that we don't get a stack trace. 
  But normally this error throwing would be handled by a 
  third party library of our choice (for example Mongoose if
  you use a MongoDB database). But for the purposes of this tutorial
  this should be fine.
*/
const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => compareWorkouts(workout, newWorkout)) >
    -1;
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Workout with the name '${newWorkout.name}' already exists`,
    };
  }
  try {
    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
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
