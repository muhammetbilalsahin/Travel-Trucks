// src/pages/CamperDetailsPage/CamperDetailsPage.jsx
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./CamperDetailsPage.module.css";
import { fetchCamperById } from "../../redux/campers/campersThunks";
import { resetCamperDetails } from "../../redux/campers/campersSlice";
import Loader from "../../components/Loader/Loader";
import BookingForm from "../../components/BookingForm/BookingForm";
import ReviewsList from "../../components/ReviewsList/ReviewsList";

export default function CamperDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { camperDetails, isLoading, error } = useSelector(
    (state) => state.campers
  );

  const [activeTab, setActiveTab] = useState("features"); // "features" | "reviews"

  useEffect(() => {
    dispatch(fetchCamperById(id));

    return () => {
      dispatch(resetCamperDetails());
    };
  }, [dispatch, id]);

  const reviewsCount = camperDetails?.reviews?.length || 0;

  const features = useMemo(() => {
    if (!camperDetails) return [];
    const f = camperDetails;
    return [
      f.AC && "AC",
      f.bathroom && "Bathroom",
      f.kitchen && "Kitchen",
      f.TV && "TV",
      f.radio && "Radio",
      f.refrigerator && "Refrigerator",
      f.microwave && "Microwave",
      f.gas && "Gas",
      f.water && "Water",
    ].filter(Boolean);
  }, [camperDetails]);

  if (isLoading && !camperDetails) {
    return <Loader />;
  }

  if (error) {
    return (
      <section className={styles.wrapper}>
        <p className={styles.error}>Error: {error}</p>
      </section>
    );
  }

  if (!camperDetails) {
    return null;
  }

  const {
    name,
    price,
    rating,
    location,
    description,
    gallery,
    form,
    length,
    width,
    height,
    tank,
    consumption,
    transmission,
    engine,
  } = camperDetails;

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>{name}</h1>

        <div className={styles.metaRow}>
          <div className={styles.rating}>
            <span className={styles.stars}>★ {rating}</span>
            <span className={styles.reviews}>
              {reviewsCount} reviews
            </span>
          </div>
          <span className={styles.location}>{location}</span>
        </div>

        <div className={styles.price}>€ {price.toFixed(2)}</div>
      </header>

      {/* GALERİ + FORM */}
      <div className={styles.mainContent}>
        <div className={styles.left}>
          {/* Gallery */}
          <div className={styles.gallery}>
            {gallery?.map((img, index) => (
              <div className={styles.thumbWrapper} key={index}>
                <img
                  src={img.thumb || img.original}
                  alt={`${name} ${index + 1}`}
                  className={styles.thumb}
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <p className={styles.description}>{description}</p>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              type="button"
              className={
                activeTab === "features"
                  ? `${styles.tab} ${styles.activeTab}`
                  : styles.tab
              }
              onClick={() => setActiveTab("features")}
            >
              Features
            </button>
            <button
              type="button"
              className={
                activeTab === "reviews"
                  ? `${styles.tab} ${styles.activeTab}`
                  : styles.tab
              }
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          <div className={styles.tabPanel}>
            {activeTab === "features" && (
              <div className={styles.featuresWrapper}>
                <div className={styles.featuresChips}>
                  {features.map((feature) => (
                    <span key={feature} className={styles.chip}>
                      {feature}
                    </span>
                  ))}
                </div>

                <div className={styles.detailsBox}>
                  <h3 className={styles.detailsTitle}>Vehicle details</h3>
                  <ul className={styles.detailsList}>
                    <li>
                      <span>Form</span>
                      <span>{form}</span>
                    </li>
                    <li>
                      <span>Length</span>
                      <span>{length}</span>
                    </li>
                    <li>
                      <span>Width</span>
                      <span>{width}</span>
                    </li>
                    <li>
                      <span>Height</span>
                      <span>{height}</span>
                    </li>
                    <li>
                      <span>Tank</span>
                      <span>{tank}</span>
                    </li>
                    <li>
                      <span>Consumption</span>
                      <span>{consumption}</span>
                    </li>
                    <li>
                      <span>Transmission</span>
                      <span>{transmission}</span>
                    </li>
                    <li>
                      <span>Engine</span>
                      <span>{engine}</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <ReviewsList reviews={camperDetails.reviews || []} />
            )}
          </div>
        </div>

        {/* Rezervasyon formu */}
        <aside className={styles.right}>
          <BookingForm camperName={name} />
        </aside>
      </div>
    </section>
  );
}
