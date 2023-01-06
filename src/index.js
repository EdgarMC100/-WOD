const express = require("express");

const bodyParser = require("body-parser");

const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const v2WorkoutRouter = require("./v2/routes/workoutRoutes");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/workouts", v1WorkoutRouter);
app.use("/api/v2/workouts", v2WorkoutRouter);

app.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});
