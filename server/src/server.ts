import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import IORedis from "ioredis";
import RedisStore from "connect-redis";

import {
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  SESSION_SECRET,
  REDIS_URL,
} from "./config/config";
import { recipeRouter } from "./routes/recipeRoutes";
import { userRouter } from "./routes/userRoutes";

const port = process.env.PORT || 8080;
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((e: Error) => {
      console.log("Error: ", e);
      setTimeout(() => {
        connectWithRetry();
      }, 5000);
    });
};

connectWithRetry();

const redisClient = new IORedis("redis");
redisClient.on("error", (err) => {
  console.log(err);
});

const redisStore = new RedisStore({ client: redisClient });

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    store: redisStore,
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/v1/users", userRouter);

app.use("/api/v1/recipes", recipeRouter);
