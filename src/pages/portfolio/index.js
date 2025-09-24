import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";
import "keen-slider/keen-slider.min.css";
import useMediaQuery from "../../hooks/useMediaQuery";

/**
 * Animation handler for phones
 * - Prevents the default link navigation
 * - Adds the active class, which reuses the hover CSS to play animation
 * - removes the class and opens the link in a new tab after a set time
 */
function phoneAnimation(e, link) {
  e.preventDefault(); // stop immediate navigation
  const el = e.currentTarget; // the <a> element that was clicked

  el.classList.add("active"); // trigger animation

  setTimeout(() => {
    el.classList.remove("active"); // clean up
    window.open(link, "_blank", "noopener,noreferrer"); // open link in new tab
  }, 1500); // animation timing
}

/**
 * Animation handler for desktops
 * - prevents default navigation
 * - Adds the reverse class, which overrides hover CSS and plays the animation backwards
 * - opens the link in a new tab after a set time
 */
function desktopAnimation(e, link) {
  e.preventDefault(); // stop immediate navigation
  const el = e.currentTarget; // the <a> element clicked

  el.classList.add("reverse"); // trigger reverse animation

  setTimeout(() => {
    el.classList.remove("reverse"); // clean up
    window.open(link, "_blank", "noopener,noreferrer"); // open link in new tab
  }, 300); // animation timing
}

/**
 * Portfolio component:
 * - Displays a list of portfolio item cards in a grid.
 * - Applies different click handlers depending on whether the device is a phone or desktop.
 */
export const Portfolio = () => {
  // Check if the current device width is <= 767px (phone)
  const isPhone = useMediaQuery("(max-width: 767px)");

  return (
    <HelmetProvider>
      <Container>
        {/* Helmet controls the document <head> */}
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />

          {/* Open Graph */}
          <meta property="og:title" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={meta.url} />
          <meta property="og:image" content={meta.image} />
        </Helmet>

        {/* Page header row */}
        <Row className="mt-5 mb-2 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Featured in: </h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>

        {/* Portfolio item grid */}
        <div className="po_items_ho">
          {dataportfolio.map((data, i) => (
            <a
              href={data.link} // fallback link (also used for right-click / new-tab)
              target="_blank"
              rel="noopener noreferrer"
              className="po_item"
              key={i}
              // on phones → play forward animation before navigation
              // on desktop → play reverse animation before navigation
              onClick={
                isPhone
                  ? (e) => phoneAnimation(e, data.link)
                  : (e) => desktopAnimation(e, data.link)
              }
            >
              {/* Card title */}
              <h3 className="po_item_title">{data.title}</h3>

              {/* Card image */}
              <img src={data.img} alt={data.title} />

              {/* Overlay content that animates in/out */}
              <div className="content">
                <div className="po_desc">
                  <p>{data.description}</p>
                  <hr />
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </HelmetProvider>
  );
};