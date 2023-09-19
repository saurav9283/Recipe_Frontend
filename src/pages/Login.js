import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../pages/Login.css";

const LoginForm = ({ onSubmit, onclick }) => {
  const [cookies, setCookies] = useCookies(["access"]);
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const toastVariable = {
    position: "top-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { username, password } = value;
    if (password === "" || username === "") {
      toast.error("Username and Password are required", toastVariable);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const response = await axios.post(
          "http://localhost:3001/auth/login",
          {
            username: value.username,
            password: value.password,
          }
        );
        if (response.data.message === "Wrong Password") {
          toast.error("Invalid Credentials", toastVariable);
        } 
        else if (response.data.message === "User does not Exist") {
          toast.error("User does not Exist", toastVariable);
        }else {
          setCookies("access", response.data.token);
          window.localStorage.setItem("userID", response.data.userID);
          navigate("/");
          toast.success("Login Successful", toastVariable);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred", toastVariable);
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
