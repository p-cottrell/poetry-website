import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { meta, databooks } from "../../content_option";

export const Books = () => {
  return (
    <HelmetProvider>
      <Container className="Books-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Books | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Books </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="book-section">
          {databooks.map((book, index) => (
            <Col
              key={index}
              lg="6"
              md="6"
              sm="12"
              className="d-flex flex-column align-items-center mb-4"
            >
              <div className="book-item">
                <img src={book.img} alt={book.title} className="book-image" />
                <div className="book-content">
                  <p className="book-title">{book.title}</p>
                  <a href={book.purchase_link} target="_blank" rel="noopener noreferrer">
                    <div id="button_h" className="ac_btn btn">
                        Purchase
                        <div className="ring one"></div>
                        <div className="ring two"></div>
                        <div className="ring three"></div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="book-details">
              <p className="book-description">
                  {book.description.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </HelmetProvider>
  );
};
