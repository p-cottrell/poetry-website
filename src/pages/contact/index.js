import React, { useState } from "react";
import * as emailjs from "emailjs-com";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { contactConfig } from "../../content_option";

export const ContactUs = () => {
  const [contactForm, setContactForm] = useState({
    email: "",
    name: "",
    message: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactForm({ ...contactForm, loading: true });

    const templateParams = {
      from_email: contactForm.email,
      name: contactForm.name,
      message: contactForm.message,
    };

    emailjs
      .send(
        contactConfig.SERVICE_ID,
        contactConfig.TEMPLATE_ID,
        templateParams,
        contactConfig.USER_ID
      )
      .then(
        () => {
          setContactForm({
            email: "",
            name: "",
            message: "",
            loading: false,
            alertmessage: "SUCCESS! Thank you for your message.",
            variant: "success",
            show: true,
          });
        },
        (error) => {
          setContactForm({
            ...contactForm,
            loading: false,
            alertmessage: `Failed to send! ${error.text}`,
            variant: "danger",
            show: true,
          });
          document.getElementsByClassName("co_alert")[0].scrollIntoView();
        }
      );
  };

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Contact | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        <Row className="mt-5 mb-2 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Contact Me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>

        <Row className="sec_sp">
          <Col lg="12">
            <Alert
              variant={contactForm.variant}
              className={`rounded-0 co_alert ${
                contactForm.show ? "d-block" : "d-none"
              }`}
              onClose={() => setContactForm({ ...contactForm, show: false })}
              dismissible
            >
              <p className="my-0">{contactForm.alertmessage}</p>
            </Alert>
          </Col>

          <Col lg="5" className="mb-5">
            <h3 className="color_sec py-4">Get in touch</h3>
            <address>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contactConfig.EMAIL}`}>
                {contactConfig.EMAIL}
              </a>
              <br />
            </address>
            <p>{contactConfig.description}</p>
          </Col>

          <Col lg="6" className="d-flex align-items-center">
            <form
              onSubmit={handleContactSubmit}
              className="contact__form card w-100"
              noValidate
            >
              <label className="block text-sm">Full name</label>
              <input
                className="form-control"
                id="contact_name"
                name="name"
                value={contactForm.name}
                type="text"
                required
                onChange={handleContactChange}
              />

              <label className="block text-sm">Email</label>
              <input
                className="form-control"
                id="contact_email"
                name="email"
                type="email"
                value={contactForm.email}
                required
                onChange={handleContactChange}
              />

              <label className="block text-sm">Message</label>
              <textarea
                className="form-control"
                id="contact_message"
                name="message"
                rows="5"
                value={contactForm.message}
                onChange={handleContactChange}
                required
              ></textarea>

              <button className="btn ac_btn submit-btn" type="submit">
                {contactForm.loading ? "Sending..." : "Send"}
                <div className="ring one"></div>
                <div className="ring two"></div>
                <div className="ring three"></div>
              </button>
            </form>
          </Col>
        </Row>
      </Container>

      <div className={contactForm.loading ? "loading-bar" : "d-none"}></div>
    </HelmetProvider>
  );
};

export default ContactUs;
