// src/components/ReviewsList/ReviewsList.jsx
import styles from "./ReviewsList.module.css";

function Stars({ value }) {
  const max = 5;
  const fullStars = Math.round(value);
  return (
    <div className={styles.stars}>
      {Array.from({ length: max }).map((_, index) => (
        <span
          key={index}
          className={
            index < fullStars ? styles.starFull : styles.starEmpty
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p className={styles.empty}>No reviews yet.</p>;
  }

  return (
    <div className={styles.list}>
      {reviews.map((review, index) => (
        <article key={index} className={styles.item}>
          <header className={styles.header}>
            <div className={styles.avatar}>
              {review.reviewer_name?.[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <div className={styles.name}>
                {review.reviewer_name}
              </div>
              <Stars value={review.reviewer_rating || 0} />
            </div>
          </header>
          <p className={styles.comment}>{review.comment}</p>
        </article>
      ))}
    </div>
  );
}
