import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta, databooks } from "../../content_option";
import { Link } from "react-router-dom";

export const Home = () => {
  const featuredBook = databooks.find(b => b.id === "just-write-about-a-bird");
  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title> {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="intro_sec d-block d-lg-flex align-items-center ">
          <div
            className="h_bg-image order-1 order-lg-2 h-100"
            style={{
              backgroundImage: `url(${introdata.your_img_url})`
            }}
          ></div>
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center ">
              <div className="intro">
                <h2 className="mb-1x">{introdata.title}</h2>
                <h1 className="fluidz-48 mb-1x">
                  <Typewriter
                    options={{
                      strings: [
                        introdata.animated.first,
                        introdata.animated.second,
                        introdata.animated.third,
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                    }}
                  />
                </h1>
                <p className="description">
                  Welcome to my wee corner of the internet!
                  I live and work on Whadjuk Noongar Country. My writing has appeared in Meniscus Literary Journal, PULP Lit Mag, Creatrix, StylusLit, Poetry d’Amour, and elsewhere.
                </p>

                <p className="description">
                  I released my first poetry collection, Speakeasy, in 2023.
                  My second poetry collection, <em>{featuredBook.title}</em>, is out now through In Case of Emergency Press. {" "}
                  <a
                    href={featuredBook.purchase_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="highlight-link"
                  >
                   Purchase your copy here
                  </a>!
                </p>
                <p className="description">
                  Thank you for supporting me ✨
                </p>

                <p className="description">
                  “Cottrell has a wonderful ability to pull you in her lived moments through words, metaphors and raw emotion.” - 
                    Spill the Tea Book Reviews
                </p>
                <p className="description">
                  <Link to="/events" className="regi-highlight-link" >
                   Register for the <em> Just Write About A Bird </em> book launch here!
                  </Link>
                </p>
                <div className="intro_btn-action">
                  <Link to="/books" >
                    <div className="ac_btn btn">
                      My Books
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  <Link to="/portfolio" >
                    <div className="ac_btn btn">
                      My Portfolio
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  <Link to="/contact" className="hide-on-mobile">
                    <div className="ac_btn btn">
                      Contact Me
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
