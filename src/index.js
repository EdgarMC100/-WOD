const express = require("express");
const bodyParser = require("body-parser");
const { logErrors, errorHandler } = require("./middlewares/error.handler");

const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const v2WorkoutRouter = require("./v2/routes/workoutRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/*
  Application-level middleware with no mount PATH, 
  therefore any request will execute this middleware
*/
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

/*
  Applicaion-level middleware with mount PATH 
  and chained with another middleware funtion
*/

app.get(
  "/user/:id",
  (req, res, next) => {
    console.log(
      "Testing to load series of middleare function at a mount point"
    );
    next("route");
    // res.status(200).send({ status: "OK", data: "First middleware function " });
  },
  (req, res, next) => {
    console.log("A chained middleware function called");
    next();
  }
);

// app.use((error,req,res, next)=>{

// })
//This middleware is executed for any type of HTTP request on the /user/:id path.
app.use("/user/:id", (req, res, next) => {
  const { params: id } = req;
  if (!id) {
    throw Error({
      status: 404,
      error: { message: "Id param is required for this request " },
    });
  }
  console.log("last middleware executed");
  res.status(200).send({ status: "OK", data: {} });
});
app.use("/api/v1/workouts", v1WorkoutRouter);
app.use("/api/v2/workouts", v2WorkoutRouter);
app.use(logErrors);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});
