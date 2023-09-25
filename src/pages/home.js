import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useGetUserID } from "../hooks/useGetuserID";
import "../pages/home.css";
const Home = () => {
  const [recipe, setRecipe] = useState([]);
  const [savedRecipe, setsavedRecipe] = useState([]);
  const [cookies, setCookies] = useCookies(["access"]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          "https://recipe-backend-phi.vercel.app/recipes"
        );
        setRecipe(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `https://recipe-backend-phi.vercel.app/recipes/savedRecipe/ids/${userID}`
        );
        setsavedRecipe(response.data.savedRecipe);
      } catch (error) {
        console.log("error");
      }
    };
    fetchRecipe();
    if (cookies.access) {
      fetchSavedRecipe();
    }
  }, []);

  const saveRecipe = async (recipeID) => {
    console.log(recipeID);

    try {
      const response = await axios.put(
        `https://recipe-backend-phi.vercel.app/recipes/${userID}`,
        { recipeID },
        { headers: { authorization: cookies.access } }
      );
      setsavedRecipe(response.data.savedRecipe);
    } catch (error) {
      console.log(error);
    }
  };
  const isRecipeSaved = (id) => {
    console.log(saveRecipe)
    return savedRecipe?.includes(id);
  };
  return (
    <div className="home">
      <h1>BestFOODs here</h1>
      <div className="card-container">
        {recipe?.map((recipe) => (
          <div key={recipe._id} className="main-card">
            <div>
              <h2>{recipe.name}</h2>
              <hr />
            </div>
            <div className="instructions">
              <p>{recipe.instruction}</p>
            </div>
            <img src={recipe.imageURL} alt={recipe.name} />
            <div className="card-footer">
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
              {cookies.access ? (
                <button
                  className="saveButton"
                  onClick={() => {
                    saveRecipe(recipe._id);
                    isRecipeSaved(recipe._id);
                  }}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
