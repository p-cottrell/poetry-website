import React, { useRef } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export const Portfolio = () => {
  const intervalRef = useRef(null);

  const resetInterval = (slider) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      slider.moveToIdx(slider.track.details.abs + 1, true, {
        duration: 1500,
        easing: (t) => t * (2 - t),
      });
    }, 6000);
  };

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1.005,
      spacing: 20,
    },
    created(slider) {
      resetInterval(slider);

      // Reset timer on click/touch
      slider.container.addEventListener("click", () => resetInterval(slider));
      slider.container.addEventListener("touchstart", () => resetInterval(slider));
    },
  });

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title> Writing | {meta.title} </title>
          <meta name="description" content={meta.description} />
        </Helmet>

        <Row className="mt-5 mb-2 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Featured in: </h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>

        <div ref={sliderRef} className="keen-slider featured-container">
          {dataportfolio.map((data, i) => (
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="keen-slider__slide featured-slide"
              key={i}
            >
              <h3 className="po_item_title">{data.title}</h3>
              <div className="featured-img-wrapper">
                <img src={data.img} alt={data.title} />
              </div>
            </a>
          ))}
        </div>

        <div className="po_items_ho">
          {dataportfolio.map((data, i) => (
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="po_item"
              key={i}
            >
              <h3 className="po_item_title">{data.title}</h3>
              <img src={data.img} alt={data.title} />
              <div className="content">
                <p>{data.description}</p>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </HelmetProvider>
  );
};
