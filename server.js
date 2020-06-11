const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/error");

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

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.rainbow
      .bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
