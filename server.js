const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
//Security packages
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
//
//Middleware
const formidableMiddleware = require("express-formidable");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

//Load Env Variables
dotenv.config({ path: "./config/config.env" });
//Connect MongoDB
connectDB();
//Route Files
const productRouts = require("./routes/productRouts");
const storeRouters = require("./routes/storeRouts");
const categoryRouters = require("./routes/categoryRouts");
const AdminBrorouter = require("./routes/adminBroRouts");

// express server definition
const app = express();
app.use(formidableMiddleware());

//Body parser
app.use(express.json());

//Dev Logging Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//file upload
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 10000,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount Routers

app.use("/api/v1/product", productRouts);
app.use("/api/v1/store", storeRouters);
app.use("/api/v1/category", categoryRouters);
app.use("/api/v1/admin", AdminBrorouter);

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
