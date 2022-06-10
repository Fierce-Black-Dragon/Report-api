require("dotenv").config();
//git push -u origin main
const express = require("express");

const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");

const app = express();

//cors middleware
app.use(cors());
//morgan
app.use(morgan("dev"));

//regular middleware
app.use(express.json());
const report = require("./routes/report");
//router middleware
app.use("/", report);

app.use("/", async (req, res, next) => {
  res.status(200).json({
    message: "welcome to home route of the web  for doc  go to  /api-docs ",
  });
});

//404(route not found) handler and pass to error handler
app.use(async (req, res, next) => {
  next(createError.NotFound());
});
//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// export app
module.exports = app;
