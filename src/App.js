import React, { useState } from "react";
// import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";

function App() {
  const [logIn, setLogIn] = useState(!!localStorage.getItem("Admintoken"));

  const handleLoginAdmin = () => {
    setLogIn(true);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setLogIn={handleLoginAdmin} />} />
        <Route
          path="/dashboard"
          element={<Dashboard logIn={logIn} setLogIn={setLogIn} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
