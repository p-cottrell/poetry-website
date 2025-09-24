import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  dataabout,
  meta,
} from "../../content_option";

export const About = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
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
            <h1 className="display-4 mb-4">About me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col>
            <img className='aboutme-img' src={dataabout.img} alt="me" />
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <div className="aboutme">
              <h2>{dataabout.title}</h2>
              <p>
                {dataabout.aboutme.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
              <p>
                If you want to get in contact with me,{" "}
                <Link to="/contact"  className="highlight-link" >
                      reach out here
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};


