import React, { useMemo, useState } from "react";
import * as emailjs from "emailjs-com";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container } from "react-bootstrap";
import { meta } from "../../content_option";
import "./style.css";



// Turn a Date into an ICS-friendly UTC string: YYYYMMDDTHHMMSSZ
const toICSDateUTC = (date) =>
  date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

// Slugify for the file name
const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Make a stable-ish UID (good enough for a static event)
const makeUID = (title) => {
  const rand = Math.random().toString(36).slice(2, 8);
  return `${slug(title)}-${rand}@${window.location.hostname || "event.local"}`;
};

/**
 * Build an ICS string using UTC times so clients handle TZ correctly.
 * @param {Object} opts
 * @param {string} opts.title
 * @param {string} opts.description
 * @param {string} opts.location
 * @param {Date}   opts.start - local Date with correct offset
 * @param {Date}   opts.end   - local Date with correct offset
 * @param {string} [opts.url] - optional URL
 */
const buildICS = ({ title, description, location, start, end, url }) => {
  const dtStamp = toICSDateUTC(new Date());
  const dtStart = toICSDateUTC(start);
  const dtEnd = toICSDateUTC(end);
  const uid = makeUID(title);

  return [
    "BEGIN:VCALENDAR",
    "PRODID:-//Static Tides//Event//EN",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\r?\n/g, "\\n")}`,
    `LOCATION:${location}`,
    url ? `URL;VALUE=URI:${url}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
};

/** Trigger a download for the given ICS content. */
const downloadICSFile = (icsText, filename = "event.ics") => {
  const blob = new Blob([icsText], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};


export const EventRegistration = () => {
  const EVENT_TITLE = "Just write about a bird - Book Launch";
  const EVENT_DATE = "22/11/2025";
  const EVENT_TIME_START = "3:00pm";
  const EVENT_TIME_END = "5:00pm";
  const EVENT_TIMEZONE = "AWST";
  const VENUE_NAME = "Pigface Bookstore";
  const VENUE_ADDR = "143 Barrack St, Perth WA 6000";
  const VENUE_MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    VENUE_NAME + " " + VENUE_ADDR
  )}`;

  const [form, setForm] = useState({
    name: "",
    email: "",
    plusOne: false,   // replaced quantity with checkbox
    notes: "",
    website: "",
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

  // --- Calendar link (Google) ---
  const googleCalHref = useMemo(() => {
    const EVENT_TZ = "Australia/Perth";
    const EVENT_DATE_ISO = "2025-11-22";

    const startLocal = "15:00:00";
    const endLocal = "17:00:00";

    const compact = (isoDate, hhmmss) =>
      `${isoDate.replaceAll("-", "")}T${hhmmss.replaceAll(":", "")}`;

    const start = compact(EVENT_DATE_ISO, startLocal);
    const end = compact(EVENT_DATE_ISO, endLocal);

    const details = `RSVP via ${window.location.origin}`;
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: "Just write about a bird - Book Launch",
      dates: `${start}/${end}`,
      details,
      location: "Pigface Bookstore, 143 Barrack St, Perth WA 6000",
      ctz: EVENT_TZ,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, []);

  // --- Calendar link (ICS) ---
  const handleDownloadICS = () => {
    const EVENT_URL = window.location.href;

    // Build local Perth times, then ICS uses UTC conversion
    const startLocal = new Date("2025-11-22T15:00:00+08:00");
    const endLocal = new Date("2025-11-22T17:00:00+08:00");

    const ics = buildICS({
      title: EVENT_TITLE,
      description:
        "Poetry book launch & signing. RSVP via " + window.location.origin,
      location: `${VENUE_NAME}, ${VENUE_ADDR}`,
      start: startLocal,
      end: endLocal,
      url: EVENT_URL,
    });

    downloadICSFile(ics, `${slug(EVENT_TITLE)}.ics`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;

    // honeypot: if filled, silently treat as done
    if (form.website) {
      return setForm((f) => ({
        ...f,
        loading: false,
        msg: "Registered!",
        ok: true,
      }));
    }

    setForm((f) => ({ ...f, loading: true, msg: "" }));

    // ---- Build display strings for the template ----
    const guestsNum = form.plusOne ? 1 : 0; // derive from checkbox
    const guestsLabel =
      guestsNum === 0 ? "no guests" : guestsNum === 1 ? "1 guest" : `${guestsNum} guests`;
    const totalAttendees = 1 + guestsNum; // person + guests
    const eventTimeRange = `${EVENT_TIME_START}–${EVENT_TIME_END} (${EVENT_TIMEZONE})`;
    const google_link = googleCalHref; // reuse computed link

    // Params passed to the EVENT_RSVP template
    const params = {
      // recipient (auto-reply target)
      to_email: form.email,
      reply_to: form.email,

      // form data
      name: form.name,
      email: form.email,
      quantity: guestsNum,           // keep same key, but value now from plusOne
      notes: form.notes || "(none)",

      // event data
      event_title: EVENT_TITLE,
      event_date: EVENT_DATE,
      event_time_range: eventTimeRange,
      venue_name: VENUE_NAME,
      venue_addr: VENUE_ADDR,
      google_link,

      // friendly labels
      guests_label: guestsLabel,
      total_attendees: totalAttendees,

      // meta (optional)
      template_type: "event_rsvp",
      variant: "registration",
      subject_override: `RSVP: ${EVENT_TITLE}`,
    };

    const serviceId  = process.env.REACT_APP_SERVICE_ID;
    const templateId = process.env.REACT_APP_EVENT_TEMPLATE_ID;
    const publicKey  = process.env.REACT_APP_USER_ID;

    // Promise timeout helper to avoid UI hanging forever
    const withTimeout = (p, ms = 15000) =>
      Promise.race([
        p,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), ms)
        ),
      ]);

    try {
      await withTimeout(emailjs.send(serviceId, templateId, params, publicKey));

      setForm({
        name: "",
        email: "",
        plusOne: false, // reset checkbox
        notes: "",
        website: "",
        loading: false,
        msg: "Registered! Check your inbox for confirmation.",
        ok: true,
      });
    } catch (err) {
      console.error("EmailJS send failed", err);
      setForm((f) => ({
        ...f,
        loading: false,
        msg:
          typeof err?.text === "string"
            ? `Failed to send: ${err.text}`
            : err?.message
            ? `Failed to send: ${err.message}`
            : "Failed to send your RSVP. Please try again.",
        ok: false,
      }));
    }
  };

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
                  <a
                    className="inline-link"
                    href="https://www.pigfacebookstore.com.au/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Pigface Bookstore
                  </a> · {VENUE_ADDR}{" "}
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
            <h3>Add to Calendar:</h3>

            <div className="regpage__hero-cta">
              <a
                className="ac_btn regpage__cta"
                href={googleCalHref}
                target="_blank"
                rel="noreferrer"
              >
                Google Calendar
                <div className="ring one"></div>
                <div className="ring two"></div>
                <div className="ring three"></div>
              </a>

              {/* Inserted ICS download button */}
              <button type="button" className="ac_btn regpage__cta" onClick={handleDownloadICS}>
                Apple / Outlook Calendar
                <div className="ring one"></div>
                <div className="ring two"></div>
                <div className="ring three"></div>
              </button>
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
                Join me in celebrating the release of{" "}
                <em>Just write about a bird</em> with select readings and a
                signing.
              </p>
              <p>Light refreshments will be provided <br />
              Limited capacity - please RSVP<br />
              Maximum 1 guest per person</p>

              <p>Hope to see you there!</p>
            </aside>

            {/* Right: Form */}
            <div className="event-registration-form card">
              {form.ok ? (
                <div className="success-block">
                  <h3 className="h3">You’re on the list! 🎉</h3>
                  <p className="muted">{form.msg}</p>
                  <div className="success-actions">
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
                    onChange={onChange} /* wired to state */
                  />

                  <h2 className="h2 form-heading">RSVP</h2>

                  <label className="block text-sm" htmlFor="name">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    className="form-control"
                  />

                  <label className="block text-sm" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    className="form-control"
                  />

                  {/* Plus One checkbox (replaces stepper) */}
                  <div className="attending-field">
                    <label htmlFor="plusOne" className="attending-label">
                      Bringing a plus one?
                    </label>
                    <div className="attending-checkbox">
                      <input
                        id="plusOne"
                        name="plusOne"
                        type="checkbox"
                        checked={!!form.plusOne}
                        onChange={onChange}
                      />
                      <span className="attending-hint">Maximum 1 guest per person</span>
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

                  <button className="btn ac_btn submit-btn" disabled={isDisabled}>
                    {form.loading ? "Submitting…" : "Register"}
                    <div className="ring one"></div>
                    <div className="ring two"></div>
                    <div className="ring three"></div>
                  </button>

                  {form.msg && (
                    <p
                      className={form.ok ? "text-success" : "text-danger"}
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
