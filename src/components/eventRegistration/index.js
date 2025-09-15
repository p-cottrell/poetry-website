import React, { useState } from "react";
import * as emailjs from "emailjs-com"; // same pkg you already use

export default function EventRegistrationForm({ eventTitle = "My Event" }) {
  const [form, setForm] = useState({
    name: "", email: "", quantity: 1, notes: "", loading: false, msg: "", ok: false
  });

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setForm(f => ({ ...f, loading: true, msg: "" }));

    const templateParams = {
      name: form.name,
      email: form.email,
      quantity: form.quantity,
      notes: form.notes,
      event_title: eventTitle,
      reply_to: form.email, // lets you hit "Reply" to respond to the attendee
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,   // same pattern you use now
        process.env.REACT_APP_EMAILJS_EVENT_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setForm({ name: "", email: "", quantity: 1, notes: "", loading: false,
          msg: "Registered! Check your inbox for confirmation.", ok: true });
      })
      .catch((err) => {
        setForm(f => ({ ...f, loading: false, msg: `Failed to send: ${err?.text || err}`, ok: false }));
      });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      {/* simple honeypot */}
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" onChange={()=>{}} />

      <div>
        <label className="block text-sm">Full name</label>
        <input name="name" value={form.name} onChange={onChange} required className="form-control" />
      </div>
      <div>
        <label className="block text-sm">Email</label>
        <input name="email" type="email" value={form.email} onChange={onChange} required className="form-control" />
      </div>
      <div>
        <label className="block text-sm">Tickets</label>
        <input name="quantity" type="number" min="1" value={form.quantity} onChange={onChange} className="form-control" />
      </div>
      <div>
        <label className="block text-sm">Notes</label>
        <textarea name="notes" rows={3} value={form.notes} onChange={onChange} className="form-control" />
      </div>

      <button className="btn ac_btn" disabled={form.loading}>
        {form.loading ? "Submitting…" : "Register"}
      </button>

      {form.msg && (
        <p className={form.ok ? "text-success" : "text-danger"} style={{marginTop: 8}}>
          {form.msg}
        </p>
      )}
    </form>
  );
}