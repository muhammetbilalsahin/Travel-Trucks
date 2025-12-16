// src/components/BookingForm/BookingForm.jsx
import { useState } from "react";
import styles from "./BookingForm.module.css";

export default function BookingForm({ camperName }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    comment: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.date) {
      alert("Please fill in required fields.");
      return;
    }

    // Backend zorunlu olmadığı için sadece sahte bir submit yapıyoruz.
    console.log("Booking data:", { camperName, ...form });

    setSuccess(true);
    // formu sıfırla
    setForm({
      name: "",
      email: "",
      date: "",
      comment: "",
    });
  };

  return (
    <div className={styles.box}>
      <h2 className={styles.title}>Book your camper</h2>
      <p className={styles.subtitle}>
        Leave your contact details and preferred date. We’ll get back to
        you with confirmation.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Name*
          <input
            className={styles.input}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </label>

        <label className={styles.label}>
          Email*
          <input
            className={styles.input}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </label>

        <label className={styles.label}>
          Date*
          <input
            className={styles.input}
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </label>

        <label className={styles.label}>
          Comment
          <textarea
            className={styles.textarea}
            name="comment"
            value={form.comment}
            onChange={handleChange}
            placeholder={`Booking details for "${camperName}"`}
          />
        </label>

        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>

      {success && (
        <p className={styles.success}>
          ✅ Reservation submitted successfully!
        </p>
      )}
    </div>
  );
}
