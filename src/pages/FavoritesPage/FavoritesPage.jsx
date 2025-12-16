import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FavoritesPage.module.css";
import { fetchCampers } from "../../redux/campers/campersThunks";
import CamperCard from "../../components/CamperCard/CamperCard";
import Loader from "../../components/Loader/Loader";

export default function FavoritesPage() {
  const dispatch = useDispatch();

  const favoritesIds = useSelector((state) => state.favorites.items);
  const { items, isLoading, error } = useSelector((state) => state.campers);

  // Favoriler sayfası açılınca tüm campers'ı bir kez çekip,
  // ids ile filtreleyerek gösteriyoruz.
  useEffect(() => {
    // Çok büyük dataset olmadığı için tamamını çekmek güvenli
    dispatch(fetchCampers({ page: 1, limit: 100, filters: {}, append: false }));
  }, [dispatch]);

  const favoriteCampers = items.filter((c) => favoritesIds.includes(c.id));

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Favorites</h1>

      {isLoading && <Loader />}
      {error && <p className={styles.error}>Error: {error}</p>}

      {!isLoading && !error && favoritesIds.length === 0 && (
        <p className={styles.empty}>You have no favorites yet.</p>
      )}

      {!isLoading && !error && favoritesIds.length > 0 && (
        <div className={styles.list}>
          {favoriteCampers.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </div>
      )}
    </section>
  );
}
