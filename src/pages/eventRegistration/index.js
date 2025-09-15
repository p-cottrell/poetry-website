import React, { useMemo, useState } from "react";
import * as emailjs from "emailjs-com";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container } from "react-bootstrap";
import { meta } from "../../content_option"; // assuming you keep meta here
import "./style.css";

export const EventRegistration = () => {
  const EVENT_TITLE = "Just Write About a Bird Book Launch";
  const EVENT_DATE = "12/11/2025";
  const EVENT_TIME_START = "6:00pm";
  const EVENT_TIME_END = "8:00pm";
  const EVENT_TIMEZONE = "Perth";
  const VENUE_NAME = "The Aviary";
  const VENUE_ADDR = " Level 1/140 William St, Perth WA 6000";
  const VENUE_MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    VENUE_NAME + " " + VENUE_ADDR
  )}`;

  const [form, setForm] = useState({
    name: "",
    email: "",
    quantity: 0,
    notes: "",
    loading: false,
    msg: "",
    ok: false,
  });

  const isDisabled = !form.name || !form.email || form.loading;

  const onChange = (e) =>
    setForm((f) => ({
      ...f,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (isDisabled) return;
    setForm((f) => ({ ...f, loading: true, msg: "" }));

    const templateParams = {
      name: form.name,
      email: form.email,
      quantity: form.quantity,
      notes: form.notes,
      event_title: EVENT_TITLE,
      reply_to: form.email,
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_EVENT_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setForm({
          name: "",
          email: "",
          quantity: 1,
          notes: "",
          loading: false,
          msg: "Registered! Check your inbox for confirmation.",
          ok: true,
        });
      })
      .catch((err) => {
        setForm((f) => ({
          ...f,
          loading: false,
          msg: `Failed to send: ${err?.text || err}`,
          ok: false,
        }));
      });
  };

  // --- Calendar link (Google) ---
  const googleCalHref = useMemo(() => {
    const start = `${EVENT_DATE}T${EVENT_TIME_START}:00`;
    const end = `${EVENT_DATE}T${EVENT_TIME_END}:00`;
    const details = `RSVP via ${window.location.origin}`;
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: EVENT_TITLE,
      dates: `${start.replace(/[-:]/g, "")}/${end.replace(/[-:]/g, "")}`,
      details,
      location: `${VENUE_NAME}, ${VENUE_ADDR}`,
      ctz: EVENT_TIMEZONE,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, []);

  return (
    <>
      <HelmetProvider>
        <Container>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Event Registration | {meta.title}</title>
            <meta name="description" content={meta.description} />
          </Helmet>
        </Container>
      </HelmetProvider>

      <main className="regpage">
        {/* Hero */}
        <section className="regpage__hero">
          <div className="regpage__hero-inner">
            <h1 className="regpage__title">{EVENT_TITLE}</h1>
            <p className="regpage__subtitle">Poetry book launch & signing</p>

            <div className="regpage__meta">
              <div className="meta__item">
                <span className="meta__label">When</span>
                <span className="meta__value">
                  {EVENT_DATE} • {EVENT_TIME_START}–{EVENT_TIME_END} (
                  {EVENT_TIMEZONE})
                </span>
              </div>
              <div className="meta__item">
                <span className="meta__label">Where</span>
                <span className="meta__value">
                  {VENUE_NAME} · {VENUE_ADDR}{" "}
                  <a
                    className="inline-link"
                    href={VENUE_MAPS}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open map
                  </a>
                </span>
              </div>
            </div>

            <div className="regpage__hero-cta">
              <a
                className="ac_btn regpage__cta"
                href={googleCalHref}
                target="_blank"
                rel="noreferrer"
              >
                Add to Google Calendar
                <div className="ring one"></div>
                <div className="ring two"></div>
                <div className="ring three"></div>
              </a>
            </div>
          </div>
        </section>

        {/* Content grid */}
        <section className="regpage__content">
          <div className="regpage__grid">
            {/* Left: About */}
            <aside className="regpage__about">
              <h2 className="h2">About the event</h2>
              <p>
                Join us to celebrate the release of{" "}
                <em>Just Write About a Bird</em> with readings, Q&amp;A, and a
                short signing. Light refreshments provided.
              </p>
              <ul className="bullets">
                <li>Doors open 6:15pm · Event starts 6:30pm</li>
                <li>Accessible venue · Family friendly</li>
                <li>Limited capacity — please RSVP</li>
              </ul>
            </aside>

            {/* Right: Form */}
            <div className="event-registration-form card">
              {form.ok ? (
                <div className="success-block">
                  <h3 className="h3">You’re on the list! 🎉</h3>
                  <p className="muted">{form.msg}</p>
                  <div className="success-actions">
                    <a
                      className="ac_btn"
                      href={googleCalHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Add to Calendar
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </a>
                    <Link to="/" className="ac_btn">
                      Back to Home
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  {/* honeypot */}
                  <input
                    name="website"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    onChange={() => {}}
                  />

                  <h2 className="h2 form-heading">RSVP</h2>

                  <label className="block text-sm">Full name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    className="form-control"
                  />

                  <label className="block text-sm">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    className="form-control"
                  />

                  {/* Guests stepper */}
                  <div className="attending-field">
                    <label
                      htmlFor="quantity"
                      className="attending-label"
                    >
                      Guests
                    </label>
                    <div
                      className="attending-stepper"
                      role="group"
                      aria-label="Guests selector"
                    >
                      <button
                        type="button"
                        className="stepper-btn"
                        aria-label="Decrease"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            quantity: Math.max(0, Number(f.quantity) - 1),
                          }))
                        }
                      >
                        &minus;
                      </button>

                      <div
                        className="stepper-value"
                        aria-live="polite"
                      >
                        {form.quantity}
                      </div>

                      <button
                        type="button"
                        className="stepper-btn"
                        aria-label="Increase"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            quantity: Math.min(1, Number(f.quantity) + 1),
                          }))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <label className="block text-sm">Notes</label>
                  <textarea
                    name="notes"
                    rows={3}
                    value={form.notes}
                    onChange={onChange}
                    className="form-control"
                  />

                  <button
                    className="btn ac_btn submit-btn"
                    disabled={isDisabled}
                  >
                    {form.loading ? "Submitting…" : "Register"}
                    <div className="ring one"></div>
                    <div className="ring two"></div>
                    <div className="ring three"></div>
                  </button>

                  {form.msg && (
                    <p
                      className={
                        form.ok ? "text-success" : "text-danger"
                      }
                      style={{ marginTop: 8 }}
                    >
                      {form.msg}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default EventRegistration;
