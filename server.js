const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

// Connect to database
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(mongo => logger.info(`Connected to MongoDB: ${mongo.connection.host}`))
  .catch(err => {
    logger.error("Error connecting to MongoDB", err.message);
    process.exit(1);
  });

const app = express();

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());

// Request logger middleware
app.use(middleware.requestLogger);

// Routes
app.use("/api/v1/stores", require("./routes/stores"));

// Unknow endpoints and error handlers middlewares
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

// Run server
app.listen(config.PORT, () =>
  logger.info(
    `Server running in ${process.env.NODE_ENV}mode on port ${config.PORT}`
  )
);
