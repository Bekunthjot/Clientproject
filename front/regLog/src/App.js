import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login_component";
import LoginAgain from "./components/login_again";
import SignUp from "./components/signup_component";
import UserDetails from "./components/userDetails";
import Congratulation from "./components/Congratulation";
import AdminDetails from "./components/adminDetails";
import Home from './components/Home'

function App() {
  return (
    <Router>
      <div className="App">
        {/* <div className="auth-wrapper">
          <div className="auth-inner"> */}
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-ag" element={<LoginAgain />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/congratulation" element={<Congratulation />} />
              <Route path="/adminDetails" element={<AdminDetails />} />
              <Route path="/userDetails" element={<UserDetails />} />
            </Routes>
          {/* </div>
        </div> */}
      </div>
    </Router>
  );
}

export default App;
