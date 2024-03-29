import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetuserID";
import Swal from 'sweetalert2'

const CreateRecipe = () => {
  const [cookies, setCookies] = useCookies(["access"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredient: [],
    instruction: "",
    imageURL: "",
    cookingTime: 0,
    userOwner: useGetUserID(),
  });
  const navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredient: [...recipe.ingredient, ""] });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredient = recipe.ingredient;
    ingredient[index] = value;
    setRecipe({ ...recipe, ingredient });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const a = window.localStorage.getItem("userID");
      if (a == null) {
        return alert("Login to add");
      }
      recipe.userOwner = a;
      const response = await axios.post("https://recipe-backend-phi.vercel.app/recipes",recipe);
      console.log(response)
      Swal.fire({
        icon: 'success',
        title: 'Recipe Created!',
        text: 'Your recipe has been successfully created.',
      });
      navigate('/')
      // alert("saved")
    } catch (error) {
      console.log(" error while adding");
    }
  };

  return (
    <div className="create-recipe">
      <h2>create recipe</h2>
      {cookies.access ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            className="outine"
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />

          <label htmlFor="ingredient">Ingredients</label>
          {recipe.ingredient.map((ingredient, index) => (
            <input
              className="outine"
              required
              key={index}
              type="text"
              name="ingredient"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          ))}
          <button
            type="button"
            className="glow-on-hover"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </button>
          <label htmlFor="instruction">Instructions</label>
          <textarea
            required
            className="outine"
            id="instructio"
            name="instruction"
            value={recipe.instruction}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="imageURL">Image URL</label>
          <input
            required
            className="outine"
            type="text"
            id="imageURL"
            name="imageURL"
            value={recipe.imageURL}
            onChange={handleChange}
          />
          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
            required
            className="outine"
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
          <button className="glow-on-hover" type="submit">
            Create Recipe
          </button>
        </form>
      ) : (
        <h1>Login To add Recipe</h1>
      )}
    </div>
  );
};

export default CreateRecipe;
