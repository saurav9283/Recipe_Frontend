import React, { useState } from 'react';
import axios from "axios";
import {useCookies} from "react-cookie";
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
const Auth = () => {
const [showLoginForm, setShowLoginForm] = useState(true);
  const handleSwitchForm = () => {
    
    setShowLoginForm(!showLoginForm);}

  return (
    <div className='auth'>        
   { showLoginForm?<LoginForm onclick={handleSwitchForm}/>:
    <RegisterForm onclick={handleSwitchForm}/>}
    </div>
  );
};



// const Register=()=>{
//     const [username,setUsername]=useState("")
//     const [password,setPassword]=useState("") 
   
//     const onsubmit=async (event)=>{
//      event.preventDefault();
//  try {
//      await axios.post("https://recipe-backend-api.vercel.app/auth/register", {
//         username,password
//      });
//      alert("Registered!")
//  } catch (error) {
//     console.log(error);
//  }
//     };
//     return (
//        <Form 
//        title="Register"
//        username={username}
//        setUsername={setUsername}
//        password={password}
//        setPassword={setPassword}
//        onSubmit={onsubmit}
//         />
//     )
// }
// const Login=()=>{
//     const [username,setUsername]=useState("")
//     const [password,setPassword]=useState("")
//     const [cookies, setCookies] =useCookies(["access"])
//     const navigate=useNavigate();
//     const onsubmit=async (event)=>{
//         event.preventDefault();
//     try {
//        const response =await axios.post("https://recipe-backend-api.vercel.app/auth/login", {
//            username,password
//         });
//         console.log(response);
//         if(response.data.token== undefined){ return alert("Wrong credential");}
//         setCookies("access",response.data.token);
        
//         window.localStorage.setItem("userID",response.data.userID);
//         navigate('/');
//     } catch (error) {
//        console.log(error);
//     }
//        };

//     return (
//        <Form 
//        title="Login"
//        username={username}
//        setUsername={setUsername}
//        password={password}
//        setPassword={setPassword}
//        onSubmit={onsubmit}
//         />)
// }

// const Form =({title,username,setUsername,password,setPassword, onSubmit})=>{
//     return(
//         <div className='auth-container'>
//         <form onSubmit={onSubmit}>
//             <h2>{title}</h2>
//             <div className='form-group'>
//                 <label htmlFor='username'>Username:</label>
//                 <input type ="text" 
//                 value={username}
//                 id="username" onChange={(event)=>{ setUsername(event.target.value)}}></input>
//             </div>
//             <div className='form-group'>
//                 <label htmlFor='passsword'>Password:</label>
//                 <input type ="text"
//                 value={password} id="password" onChange={(event)=>{setPassword(event.target.value)}}></input>
//             </div>
//             <button type='submit'>{title}</button>
//         </form>
//         </div>
//     )
// }



const FormContainer = styled.div`
  display: flex;
  width:100%;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const FormTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const FormButton = styled.button`
  background-color: #007bff;
  border: none;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const FormSwitch = styled.p`
  font-size: 14px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm = ({ onSubmit, onclick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookies] =useCookies(["access"])
    const navigate=useNavigate();
     const handleSubmit=async (event)=>{
         event.preventDefault();
     try {
        const response =await axios.post("https://recipe-backend-api.vercel.app/auth/login", {
        username:email,password
     });
     if(response.data.message === "User does not Exist" )
     alert("User does not Exist")
     else{
      setCookies("access",response.data.token);
      console.log(response)
      window.localStorage.setItem("userID",response.data.userID);
     navigate('/');
     }
     
        
   } catch (error) {
       console.log(error);
    }
      };

  return (
    <form onSubmit={handleSubmit}>
      <FormTitle>Login</FormTitle>
      <FormInput
        type='text'
        placeholder="User Name"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <FormInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <FormButton type="submit" >Submit</FormButton>
      <FormSwitch onClick={onclick}>Don't have an account? Register</FormSwitch>
    </form>
  );
};

const RegisterForm = ({ onSubmit, onclick }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit=async (event)=>{
          event.preventDefault();
      try {
         const apple= await axios.post("https://recipe-backend-api.vercel.app/auth/register", {
             name,username:email,password
          });
          console.log(apple.data.message);
          alert(apple.data.message);
          onclick();
      } catch (error) {
         console.log(error);
      }
         };

  return (
    <form onSubmit={handleSubmit}>
      <FormTitle>Register</FormTitle>
      <FormInput
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <FormInput
        type="text"
        placeholder="UserName"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <FormInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <FormButton type="submit">Submit</FormButton>
      <FormSwitch onClick={onclick}>Already have an account? Login</FormSwitch>
    </form>
  );
};

const LoginFormContainer = styled(FormContainer)`
  width: 400px;
`;

const RegisterFormContainer = styled(FormContainer)``
export default Auth