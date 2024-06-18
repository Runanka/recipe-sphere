const express = require("express");
const app = express();

const cors = require("cors");

const PORT = 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/api/recipes", (req, res) => {
  res.json({
    dish: "Biryani",
    ingredients: [
      "Basmati rice",
      "Chicken",
      "Yogurt",
      "Onions",
      "Tomatoes",
      "Ginger",
      "Garlic",
      "Green chilies",
      "Mint leaves",
      "Coriander leaves",
      "Lemon",
      "Spices",
    ],
    author: "runankaroy",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
