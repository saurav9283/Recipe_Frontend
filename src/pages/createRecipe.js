import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const CreateRecipe = () => {
  const [cookies, setCookies] =useCookies(["access"])
  const [recipe, setRecipe]=useState({
    name:"",
    ingredient:[],
    instruction:"",
    imageURL:"",
    cookingTime:0,
    userOwner:"644a67fc832e0b2fa23ba787"
  });
  const navigate=useNavigate();

  const handleChange=(event)=>{
    const {name,value}= event.target;
    setRecipe({...recipe, [name]:value});
    
  };


  const handleAddIngredient=()=>{
   setRecipe({...recipe, ingredient:[...recipe.ingredient,""]})
  };


  const handleIngredientChange=(event, index)=>{
 const {value}=event.target;
 const ingredient=recipe.ingredient;
 ingredient[index]=value; 
 setRecipe({...recipe, ingredient})
  };
  
  const handleSubmit= async(event)=>{
    event.preventDefault();
    try {
      const a= window.localStorage.getItem("userID");
      if(a==null){return alert("Login to add");}
      recipe.userOwner=a;
       
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://recipe-backend-api.vercel.app/recipes/createRecipe',
        headers: { },
        data : recipe
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert(response.data.message);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    } catch (error) { 
      console.log(" error while adding");
    }
  }

  return (
    <div className='create-recipe'>
      <h2>create recipe</h2>{ cookies.access?
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input className='outine'
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          
        />
        
        <label htmlFor="ingredient">Ingredients</label>
        {recipe.ingredient.map((ingredient, index) => (
          <input className='outine'
          required
            key={index}
            type="text"
            name="ingredient"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button type="button" className='glow-on-hover' onClick={handleAddIngredient}>
          Add Ingredient
        </button>
        <label htmlFor="instruction">Instructions</label>
        <textarea required className='outine'
          id="instructio"
          name="instruction"
          value={recipe.instruction}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageURL">Image URL</label>
        <input required className='outine'
          type="text"
          id="imageURL"
          name="imageURL"
          value={recipe.imageURL}
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input required className='outine'
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />
        <button className='glow-on-hover' type="submit">Create Recipe</button>
      </form>:<h1>Login To add Recipe</h1>}
    </div>
  )
}

export default CreateRecipe