import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../pages/Register.css";

const RegisterForm = ({ onSubmit, onclick }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const apple = await axios.post(
          "https://recipe-backend-api.vercel.app/auth/register",
          {
            name,
            username: email,
            password,
          }
        );
        console.log(apple.data.message);
        alert(apple.data.message);
        onclick();
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="formTitle">Register</h2>
          <input className="formInput"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <input className="formInput"
            type="text"
            placeholder="UserName"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input className="formInput"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <br></br>
          <button className="formButton" type="submit">Submit</button>
          <p className="formSwitch" onClick={onclick}>
            Already have an account? Login
          </p>
        </form>
        <ToastContainer />
      </div>
    );
  };

  export default RegisterForm;
