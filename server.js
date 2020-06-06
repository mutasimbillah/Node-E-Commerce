const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

//Route Files
const allRouts = require("./routes/allRouts");
//Load Env Variables
dotenv.config({ path: "./config/config.env" });
const app = express();

//Dev Logging Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//Mount Routers
app.use("/api/v1/data", allRouts);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.rainbow.bold
  )
);
