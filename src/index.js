const express = require("express");

const v1Router = require("./v1/routes");
const app = express();
const port = process.env.PORT || 3000;

app.use("/api/v1", v1Router);

app.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});
