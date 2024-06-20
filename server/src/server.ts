import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Response, Request } from "express";
import {
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
} from "./config/config";

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

const recipeSchema = new mongoose.Schema({
  dish: String,
  ingredients: [String],
  author: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

const app = express();

app.use(
  cors({
    origin: corsOrigin,
  })
);

app.use(express.json());

app.get("/api/v1/recipes", (req: Request, res: Response) => {
  try {
    res.json({
      message: "Hello from recipes",
    });
  } catch (err) {
    res.status;
  }
});

app.post("/api/v1/recipes", async (req: Request, res: Response) => {
  const { dish, ingredients, author } = req.body;

  if (!dish) {
    return res.status(400).json({ message: "Dish is required" });
  }

  if (!ingredients || ingredients.length < 2) {
    return res
      .status(400)
      .json({ message: "At least 2 ingredients are required" });
  }

  if (!author) {
    return res.status(400).json({ message: "Author is required" });
  }

  try {
    const newRecipe = new Recipe({ dish, ingredients, author });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/api/v1/recipes/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    await Recipe.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/v1/recipes/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const recipe = await Recipe.findById(id);
    res.json(recipe);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
