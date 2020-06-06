const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

//Load Env Variables
dotenv.config({ path: "./config/config.env" });
//Connect MongoDB
connectDB();
//Route Files
const productRouts = require("./routes/productRouts");

const app = express();
//Body parser
app.use(express.json());

//Dev Logging Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//Mount Routers
app.use("/api/v1/product", productRouts);
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.rainbow.bold
  )
);
//Handle unhandle Promise Rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`.red.bold);
  //close Server
  //ServiceWorkerRegistration.close(() => process.exit(1));
});
