import Image from "next/image";
import { AccentFont, SecondaryFont } from "./_components/fonts";

async function getRecipe() {
  const res = await fetch("http://localhost:8080/api/recipes", {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recipe");
  }

  return res.json();
}

export default async function MainLayout() {
  const recipe = await getRecipe();

  const dish = recipe.dish;
  const author = recipe.author;
  const ingredients = recipe.ingredients;

  return (
    <div
      className="w-full flex justify-center items-center z-0"
      style={{
        height: "calc(100svh - 3rem)",
      }}
    >
      <div className="relative w-full md:w-[30rem] h-[90%] bg-card shadow-lg rounded-lg">
        <div className="relative w-full h-[70%]">
          <Image src="/food.jpg" layout="fill" objectFit="cover" alt="food" />
          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-card to-transparent"></div>
        </div>
        <div className="absolute left-0 bottom-0 h-[50%] w-full flex flex-col justify-between">
          <div className="w-full text-4xl p-4 bg-accent1 bg-opacity-80 text-white">
            <AccentFont>{dish}</AccentFont>
          </div>
          <div className="flex flex-col justify-between w-full h-full p-4">
            <div className="w-full flex flex-wrap gap-1">
              {ingredients.map((ingredient: string, index: number) => (
                <span
                  key={index}
                  className="p-2 border-2 border-info rounded-full"
                >
                  {ingredient}
                </span>
              ))}
            </div>
            <div className=" bg-accent2 text-white rounded-full w-min p-2">
              <SecondaryFont>@{author}</SecondaryFont>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
