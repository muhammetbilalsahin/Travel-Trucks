import { useDispatch, useSelector } from "react-redux";
import styles from "./CamperCard.module.css";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";

const getImageUrl = (img) => {
  if (!img) return "";
  if (typeof img === "string") return img;
  return img.thumb || img.original || "";
};

export default function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const {
    id,
    name,
    price,
    rating,
    location,
    description,
    gallery,
    transmission,
    engine,
    AC,
    bathroom,
    kitchen,
    TV,
    radio,
    refrigerator,
    microwave,
    gas,
    water,
    reviews,
  } = camper;

  const mainImage = getImageUrl(gallery?.[0]);
  const isFavorite = favorites.includes(id);
  const reviewsCount = reviews?.length || 0;

  const handleShowMore = () => {
    window.open(`/catalog/${id}`, "_blank", "noopener,noreferrer");
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  // Kart altındaki feature chip’leri (tasarımdaki Automatic, Diesel, AC, Bathroom vb.)
  const featureChips = [
    transmission && transmission, // Automatic / Manual
    engine && engine,             // Diesel / Petrol
    AC && "AC",
    bathroom && "Bathroom",
    kitchen && "Kitchen",
    TV && "TV",
    radio && "Radio",
    refrigerator && "Refrigerator",
    microwave && "Microwave",
    gas && "Gas",
    water && "Water",
  ].filter(Boolean);

  return (
    <article className={styles.card}>
      {mainImage && (
        <div className={styles.imageWrapper}>
          <img src={mainImage} alt={name} className={styles.image} />
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h2 className={styles.name}>{name}</h2>

          <div className={styles.priceRow}>
            <span className={styles.price}>€ {price.toFixed(2)}</span>

            <button
              type="button"
              className={styles.favoriteBtn}
              onClick={handleToggleFavorite}
              aria-label="Toggle favorite"
            >
              {isFavorite ? "♥" : "♡"}
            </button>
          </div>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.rating}>
            ★ {rating.toFixed(1)}{" "}
            <span className={styles.reviews}>
              ({reviewsCount} Reviews)
            </span>
          </span>

          <span className={styles.location}>
            📍 {location}
          </span>
        </div>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {featureChips.length > 0 && (
          <div className={styles.featuresRow}>
            {featureChips.map((feat, idx) => (
              <span key={idx} className={styles.featureChip}>
                {feat}
              </span>
            ))}
          </div>
        )}

        <div className={styles.actions}>
          <button className={styles.showMore} onClick={handleShowMore}>
            Show more
          </button>
        </div>
      </div>
    </article>
  );
}
