import axios from "axios";
import React, { useState, useEffect } from "react";
import { useGetUserID } from "../hooks/useGetuserID";
import { useCookies } from "react-cookie";
import Swal from 'sweetalert2';

const SavedRecipe = () => {
  const [cookies, setCookies] = useCookies(["access"]);
  const [savedRecipe, setSavedRecipe] = useState([]);
  const [isChange, setIsChange] = useState(false);

  const userID = useGetUserID();
  
  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        if (cookies.access) {
          const response = await axios.get(
            `https://recipe-backend-phi.vercel.app/recipes/savedRecipe/${userID}`
          );
          setSavedRecipe(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedRecipe();
  }, [isChange]);

  const removeRecipe = async (recipeID) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `https://recipe-backend-phi.vercel.app/recipes/remove/${userID}`,
            { recipeID },
            {
              headers: {
                Authorization: cookies.access,
              },
            }
          );
          setIsChange(!isChange);
          Swal.fire('Deleted!', 'Your recipe has been deleted.', 'success');
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="home">
      {cookies.access ? <h1>Saved Recipes</h1> : <h1>Login to View</h1>}
      {savedRecipe?.length === 0 ? (
        <h1>Ahhh... Add something to your List</h1>
      ) : null}

      <div className="card-container">
        {savedRecipe?.map((recipe) => (
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

              <button
                className="Remove"
                onClick={() => removeRecipe(recipe._id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedRecipe;
