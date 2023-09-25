import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Auth from "./pages/auth";
import CreateRecipe from "./pages/createRecipe";
import SavedRecipe from "./pages/savedRecipe";
import Navbar from "./components/navbar";
// import { ToastContainer } from 'react-toastify';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/createRecipe" element={<CreateRecipe />} />
          <Route path="/savedRecipe" element={<SavedRecipe />} />
        </Routes>
      </Router>
      {/* <Toaster /> */}
      <Toaster
        toastOptions={{
          style: {
            background: "rgb(51 65 85)",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}

export default App;
