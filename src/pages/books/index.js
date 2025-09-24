import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { meta, databooks } from "../../content_option";
import { Link } from "react-router-dom";

export const Books = () => {
  return (
    <HelmetProvider>
      <Container className="Books-header">
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
        <Row className="mt-5 mb-2 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Books</h1>
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
              <Link to={`/books/${book.id}`}>
                <div className="book-item">
                  <img src={book.img} alt={book.title} className="book-image" />
                  <div className="book-content">
                    <div className="book_hover">
                      <p>{book.title}</p>
                      <hr />
                    </div>
                  </div>
                </div>
              </Link>

              <div className="book-details">
                <h1 className="book-title" >{book.title}</h1>
                <div className="book-description">
                  {book.description.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                  <a
                    href={book.purchase_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div id="button_h" className="book-btn btn">
                      Purchase
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </a>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </HelmetProvider>
  );
};