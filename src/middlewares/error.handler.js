//It can be used for integrate it with error tracking service
function logErrors(error, req, res, nextt) {
  console.error(error);
  nextt(error);
}

function errorHandler(error, req, res, next) {
  console.log("Entered");
  //res
  //   .status(error?.status || 500) //optional chaning
  //   .send({ status: "FAILED", data: (error && error.message) || error });
  res.status(error?.status).send({
    status: error?.status || 500,
    data: {
      error: error?.message || error,
    },
  });
}
module.exports = {
  logErrors,
  errorHandler,
};
