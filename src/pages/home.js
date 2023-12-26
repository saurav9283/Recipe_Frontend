import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetuserID";
import "../pages/home.css";
import toast from "react-hot-toast";
import load from "../hooks/load.gif";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState([]);
  const [savedRecipe, setSavedRecipe] = useState([]);
  const [cookies] = useCookies(["access"]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          "https://recipe-backend-phi.vercel.app/recipes"
        );
        setRecipe(response.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipe();
  }, [cookies.access, userID]); // Added dependencies for useEffect

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        `https://recipe-backend-phi.vercel.app/recipes/${userID}`,
        { recipeID },
        { headers: { authorization: cookies.access } }
      );
      toast.success("Recipe Saved", {
        duration: 4000,
        position: "top-center",
      });
      setSavedRecipe(response.data.savedRecipe);
    } catch (error) {
      console.log(error);
    }
  };

  const isRecipeSaved = (id) => {
    return savedRecipe?.includes(id);
  };

  return (
    <div className="home">
      <h1>BestFOODs here</h1>
      {loading ? ( // Display the loading GIF if loading state is true
        <img src={load} alt="Loading..." />
      ) : (
        <div className="card-container">
          {/* Render recipe cards once the data is loaded */}
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
      )}
    </div>
  );
};

export default Home;
