import React, { useState } from "react";
import "./style.css";
import { RxHamburgerMenu, RxCross2  } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import { logotext ,socialprofils } from "../content_option";
//import Themetoggle from "../components/themetoggle";

const Headermain = () => {
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden");
  };

  return (
    <>
      <header className="fixed-top site__header">
        <div className="header__container d-flex align-items-center justify-content-between">
          <Link  className="navbar-brand nav_ac" to="/">
            {logotext}
          </Link>
          <div className="d-flex align-items-center">
            <button type='button' className="menu__button  nav_ac" onClick={handleToggle}>
              {!isActive ? <RxCross2 /> : <IoIosMenu />}
            </button>
          </div>
        </div>

        <div className={`site__navigation ${!isActive ? "menu__opend" : ""}`}>
          <div className="bg__menu h-100">
            <div className="menu__wrapper">
              <div className="menu__container p-3">
                <ul className="the_menu">
                  <li className="menu_item ">
                  <Link  onClick={handleToggle} to="/" className="my-3">Home</Link>
                  </li>
                  <li className="menu_item">
                    <Link  onClick={handleToggle} to="/portfolio" className="my-3"> Portfolio</Link>
                  </li>
                  <li className="menu_item">
                    <Link  onClick={handleToggle} to="/books" className="my-3"> Books</Link>
                  </li>
                  <li className="menu_item">
                  <Link onClick={handleToggle} to="/about" className="my-3">About</Link>
                  </li>
                  <li className="menu_item">
                  <Link onClick={handleToggle} to="/contact" className="my-3"> Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="menu_footer">
            <div className="d-flex">
            <a href={socialprofils.medium}>Medium</a>
            <a href={socialprofils.instagram}>Instagram</a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Headermain;
