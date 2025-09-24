import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router
} from "react-router-dom";

import AppRoutes from "./routes";
import Headermain from "../header";
import "./App.css";
import background from '../assets/images/background.jpg';




export default function App() {
  return (
    <div className='background-img' style={{ backgroundImage: `url(${background})` }}>
      <Router basename={process.env.PUBLIC_URL}>
        <Headermain />
        <AppRoutes />
      </Router>
    </div>
  );
}