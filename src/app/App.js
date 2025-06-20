import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import withRouter from "../hooks/withRouter";
import AppRoutes from "./routes";
import Headermain from "../header";
import "./App.css";
import background from '../assets/images/background.jpg';


function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}
const ScrollToTop = withRouter(_ScrollToTop);

export default function App() {
  return (
    <div className='background-img' style={{ backgroundImage: `url(${background})` }}>
      <Router basename={process.env.PUBLIC_URL}>
        <ScrollToTop>
          <Headermain />
          <AppRoutes />
        </ScrollToTop>
      </Router>
    </div>
  );
}

