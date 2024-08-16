// import dependencies
import express from "express";
import bodyParser from "body-parser";
import morgan, { compile } from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import api from "./api";

dotenv.config();

const app = express();

const FRONTEND_APP_URL =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_APP_URL
    : "http://localhost:3000";

const corsOptions = {
  origin: FRONTEND_APP_URL,

  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(morgan("dev"));

const database =
  process.env.NODE_ENV === "production"
    ? process.env.DB_HOS
    : process.env.DB_HOST;

// Configuring the database
mongoose.Promise = global.Promise;

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database!");
  })
  .catch((err) => {
    console.log(err, "Could not connect to the database. Exiting now...");
    process.exit();
  });

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to  Spaceinnovationhub API." });
});

// modify request object
app.use((req, res, next) => {
  res.locals.userId = 0.0;
  res.locals.userType = "anonymous";
  res.locals.role = "";
  next();
});

// Use Routes
app.use("/api/v1", api);

app.use((req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: `Spaceinnovationhub API says ${error.message}`,
    },
  });
  next();
});

export default app;
