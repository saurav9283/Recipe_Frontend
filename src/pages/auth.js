import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Login from "../pages/Login.js"
import Register from "../pages/Register.js"


const Auth = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const handleSwitchForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="auth">
      {showLoginForm ? (
        <Login onclick={handleSwitchForm} />
      ) : (
        <Register onclick={handleSwitchForm} />
      )}
    </div>
  );
};

export default Auth;
