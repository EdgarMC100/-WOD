const workoutService = require("../services/workoutService");

const getAllWorkouts = (req, res) => {
  const allWorkouts = workoutService.getAllWorkouts();
  res.send({ status: "OK", data: allWorkouts });
};

const getOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  const workout = workoutService.getOneWorkout(workoutId);
  if (workout) {
    res.send({ status: "201", data: workout });
    return;
  }
  res.send({ status: "404", data: "Workout does not exist" });
};

const createNewWorkout = (req, res) => {
  const {
    body: { name: name, mode, equipment, exercises, trainerTips },
  } = req;
  if (!name || !mode || !equipment || !exercises || !trainerTips) {
    res.status(400).send({ status: "ERROR", errorMessage: "Client error" });
    return;
  }
  const newWorkout = {
    name,
    mode,
    equipment,
    exercises,
    trainerTips,
  };
  console.log(newWorkout);
  const createdWorkout = workoutService.createNewWorkout(newWorkout);
  if (!createdWorkout) {
    res.status(201).send({ status: "Error", data: "Workout already exists " });
    return;
  }
  res.status(201).send({ status: "OK", data: createdWorkout });
};

const updateOneWorkout = (req, res) => {
  const {
    body,
    params: { workoutId },
  } = req;
  if (!workoutId) {
    return;
  }
  // console.log(req.params.workoutId, workoutId, body);
  const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
  res.send({ status: "OK", data: updatedWorkout });
};

const deleteWorkout = (req, res) => {
  const {
    params: { workoutId: workoutId },
  } = req;

  const deletedWorkout = workoutService.deleteWorkout(workoutId);
  if (deletedWorkout) {
    res.status(201).send({ status: "OK", data: deletedWorkout });
  }
  res.send({ status: "404", data: "Workout does not exist" });
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteWorkout,
};
