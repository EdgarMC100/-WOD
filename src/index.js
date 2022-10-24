const express = require("express");

const v1Router = require("./v1/routes");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h2>It's workings</h2>");
});

app.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});
