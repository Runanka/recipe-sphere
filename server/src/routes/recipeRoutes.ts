import express from "express";
import {
  getAllRecipes,
  getOneRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController";
import { protect } from "../middleware/authMiddleware";

const recipeRouter = express.Router();

recipeRouter.route("/").get(getAllRecipes).post(protect, createRecipe);
recipeRouter
  .route("/:id")
  .get(getOneRecipe)
  .patch(protect, updateRecipe)
  .delete(protect, deleteRecipe);

export { recipeRouter };
