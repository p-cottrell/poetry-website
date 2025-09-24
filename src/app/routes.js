import React, { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Home } from "../pages/home";
import { Portfolio } from "../pages/portfolio";
import { Books } from "../pages/books";
import { BookDetail } from "../pages/bookDetail";
import { ContactUs } from "../pages/contact";
import { About } from "../pages/about";
import { EventRegistration } from "../pages/eventRegistration";
import { Socialicons } from "../components/socialicons";
import useMediaQuery from "../hooks/useMediaQuery";

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function AppRoutes() {
  const location = useLocation();
  const isPhone = useMediaQuery("(max-width: 767px)"); // adjust breakpoint as needed

  return (
    <div className="app-shell s_c">
      <ScrollToTopOnRouteChange />

      <div className="route-viewport">
        <TransitionGroup component={null}>
          <CSSTransition
            key={location.pathname}
            timeout={isPhone ? 20 : 420}   // 20ms on phones, 400ms otherwise
            classNames="page"
            unmountOnExit
          >
            <div className="page">
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:id" element={<BookDetail />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/events" element={<EventRegistration />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>

      <footer className="site-footer">
        <Socialicons />
      </footer>
    </div>
  );
}
