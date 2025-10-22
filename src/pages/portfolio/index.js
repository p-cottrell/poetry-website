import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";
import "keen-slider/keen-slider.min.css";
import useMediaQuery from "../../hooks/useMediaQuery";

// helpers (DRY)
const triggerAnimation = (el, cls, ms, after) => {
  el.classList.add(cls);
  window.setTimeout(() => {
    el.classList.remove(cls);
    if (after) after();
  }, ms);
};

// Phone: forward animation, no nav yet
const phoneAnimation = (e) => {
  e.preventDefault();
  triggerAnimation(e.currentTarget, "active", 2000); // show overlay + button, auto-clear
};

// Desktop: reverse, then open in new tab
const desktopAnimation = (e, link) => {
  e.preventDefault();
  triggerAnimation(e.currentTarget, "reverse", 300, () => {
    window.open(link, "_blank", "noopener,noreferrer");
  });
};

// Button that opens a link
const OpenButton = ({ link, sameTab }) => {
  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (sameTab) {
      window.location.href = link;
    } else {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <button className="open_btn" onClick={onClick}>
      Open
    </button>
  );
};

export const Portfolio = () => {
  const mqTouch = useMediaQuery("(hover: none) and (pointer: coarse)");

  const runtimeTouch =
    typeof window !== "undefined" &&
    (
      // modern
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
      // older Safari/Chrome flags
      ("ontouchstart" in window) ||
      // some devices report hover incorrectly
      (window.matchMedia && window.matchMedia("(hover: none)").matches)
    );

  // final touch decision: media query OR runtime detection
  const isTouch = mqTouch || runtimeTouch;

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Portfolio | {meta.title}</title>
          <meta name="description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={meta.url} />
          <meta property="og:image" content={meta.image} />
        </Helmet>

        <Row className="mt-5 mb-2 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Featured in: </h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>

        <div className="po_items_ho">
          {dataportfolio.map((data, i) => {
          const isTouch = window.matchMedia && window.matchMedia("(hover: none)").matches;

          // On touch: dummy href; On desktop: real href + target
          const href   = isTouch ? "#" : data.link;
          const target = isTouch ? undefined : "_blank";
          const rel    = isTouch ? undefined : "noopener noreferrer";

          const onTileClick = (e) => {
            // If you clicked the Open button, let that handler run instead
            if (e.target.closest(".open_btn")) return;

            if (isTouch) {
              // MOBILE/TABLET: stop any navigation; just play the animation
              e.preventDefault();
              const el = e.currentTarget;
              el.classList.add("active");
              // optional auto-clear
              setTimeout(() => el.classList.remove("active"), 2000);
            } else {
              // DESKTOP: reverse animation then open new tab
              e.preventDefault();
              const el = e.currentTarget;
              el.classList.add("reverse");
              setTimeout(() => {
                el.classList.remove("reverse");
                window.open(data.link, "_blank", "noopener,noreferrer");
              }, 300);
            }
          };

          const onOpenClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isTouch) {
              // Same tab on mobile avoids any popup blocking
              window.location.href = data.link;
            } else {
              window.open(data.link, "_blank", "noopener,noreferrer");
            }
          };

          return (
            <a
              key={i}
              href={href}
              target={target}
              rel={rel}
              className="po_item"
              onClick={onTileClick}
            >
              <h3 className="po_item_title">{data.title}</h3>
              <img src={data.img} alt={data.title} />

              <div className="content">
                <div className="po_desc">
                  <p>{data.description}</p>
                  <hr />
                  {/* Show the button via CSS when .active */}
                  <button type="button" className="open_btn" onClick={onOpenClick}>
                    Open
                  </button>
                </div>
              </div>
            </a>
          );
        })}
        </div>
      </Container>
    </HelmetProvider>
  );
};