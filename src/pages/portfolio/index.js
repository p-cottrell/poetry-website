import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";
import "keen-slider/keen-slider.min.css";

export const Portfolio = () => {

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
