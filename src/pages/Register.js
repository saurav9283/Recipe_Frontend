import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import "../pages/Register.css";

const RegisterForm = ({ onclick }) => {
  const [value, setValue] = useState({
    name: "",
    username: "",
    password: "",
  });
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://recipe-backend-phi.vercel.app/auth/register",
        {
          name: value.name,
          username: value.username,
          password: value.password,
        }
      );
      if (response.data.message === "User Already Exist!") {
        toast.error("User Already Exist!", {
          duration: 4000,
          position: "top-center",
        });
      } else if (response.data.message === "user registered") {
        toast.success("User Already Exist!", {
          duration: 4000,
          position: "top-center",
        });
        onclick();
      } else {
        toast.error("An error occurred. Please try again later.", {
          duration: 4000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="formTitle">Register</h2>
        <input
          className="formInput"
          type="text"
          placeholder="Name"
          value={value.name}
          onChange={(event) => setValue({ ...value, name: event.target.value })}
        />
        <input
          className="formInput"
          type="text"
          placeholder="UserName"
          value={value.username}
          onChange={(event) =>
            setValue({ ...value, username: event.target.value })
          }
        />
        <input
          className="formInput"
          type="password"
          placeholder="Password"
          value={value.password}
          onChange={(event) =>
            setValue({ ...value, password: event.target.value })
          }
        />
        <br></br>
        <button className="formButton" type="submit">
          Submit
        </button>
        <p className="formSwitch" onClick={onclick}>
          Already have an account? Login
        </p>
      </form>
      
    </div>
  );
};

export default RegisterForm;
