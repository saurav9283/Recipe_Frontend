import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../pages/Login.css";

const LoginForm = ({ onSubmit, onclick }) => {
  const [cookies, setCookies] = useCookies(["access"]);
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
 

  const handleValidation = () => {
    const { username, password } = value;
    if (password === "" || username === "") {
      toast.error("Username and Password are required", {
        duration: 4000,
        position: "top-center",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const response = await axios.post(
          "https://recipe-backend-phi.vercel.app/auth/login",
          {
            username: value.username,
            password: value.password,
          }
        );
        if (response.data.message === "Wrong Password") {
          toast.error("Invalid Credentials", {
            duration: 4000,
            position: "top-center",
          });
        } 
        else if (response.data.message === "User does not Exist") {
          toast.error("User does not Exist", {
            duration: 4000,
            position: "top-center",
          });
        }else {
          setCookies("access", response.data.token);
          window.localStorage.setItem("userID", response.data.userID);
          navigate("/");
          toast.success("Login Successful", {
            duration: 4000,
            position: "top-center",
            style: {
              background: "white", 
              color: "green",      
              borderRadius: "8px", 
            }
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred", {
          duration: 4000,
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="LoginFormContainer">
      <form onSubmit={handleSubmit}>
        <h2 className="formTitle">Login</h2>
        <input
          className="formInput"
          type="text"
          placeholder="User Name"
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
        <button type="submit" className="formButton">
          Submit
        </button>
        <p className="formSwitch" onClick={onclick}>
          Don't have an account? Register
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
