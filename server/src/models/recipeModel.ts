import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    cuisine: { type: String, required: [true, "Cuisine is required"] },
    ingredients: {
      type: [String],
      required: [true, "Ingredients are required"],
    },
    author: { type: String, required: [true, "Author is required"] },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export { Recipe };
