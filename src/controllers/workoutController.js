const workoutService = require("../services/workoutService");
const { body, validationResult } = require("express-validator");
const getAllWorkouts = (req, res) => {
  try {
    const allWorkouts = workoutService.getAllWorkouts();
    res.send({ status: "OK", data: allWorkouts });
  } catch (error) {
    res
      // .status((error && error.status) || 500)
      .status(error?.status || 500)
      //or                             { error: error && error.message || error}
      .send({ status: "FAILED", data: { error: error?.message || error } }); //Optional chaining
  }
};

const getOneWorkout = (req, res, next) => {
  try {
    const {
      params: { workoutId },
    } = req;
    const workout = workoutService.getOneWorkout(workoutId);
    res.status(200).send({ status: "OK", data: workout });
  } catch (error) {
    next(error);

    // res
    //   .status(error?.status || 500) //optional chaning
    //   .send({ status: "FAILED", data: (error && error.message) || error });
  }
};

const createNewWorkout = (req, res) => {
  const {
    body: { name: name, mode, equipment, exercises, trainerTips },
  } = req;
  if (!name || !mode || !equipment || !exercises || !trainerTips) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
      },
    });
    return;
  }
  const newWorkout = {
    name,
    mode,
    equipment,
    exercises,
    trainerTips,
  };
  try {
    const createdWorkout = workoutService.createNewWorkout(newWorkout);
    res.status(201).send({ status: "OK", data: createdWorkout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneWorkout = (req, res) => {
  //Implementing express-validator
  const {
    body,
    params: { workoutId },
  } = req;
  if (!workoutId) {
    res
      .status(400)
      .send({ status: 400, error: "An id is required for update a workout" });
    return;
  } else if (bodyIsEmpty) {
    res
      .status(400)
      .send({ status: 400, error: "An payload is required for this request" });
  }
  // console.log(req.params.workoutId, workoutId, body);
  const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
  res.send({ status: "OK", data: updatedWorkout });
};

const deleteWorkout = (req, res) => {
  const {
    params: { workoutId: workoutId },
  } = req;
  if (!workoutId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "An identifier is required for this request" },
    });
  }
  try {
    const deletedWorkout = workoutService.deleteWorkout(workoutId);
    res.status(201).send({ status: "OK", data: deletedWorkout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
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
