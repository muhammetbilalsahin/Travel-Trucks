import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CatalogPage.module.css";
import { fetchCampers } from "../../redux/campers/campersThunks";
import {
  resetCampers,
  setPage,
} from "../../redux/campers/campersSlice";
import CamperCard from "../../components/CamperCard/CamperCard";
import Loader from "../../components/Loader/Loader";
import Filters from "../../components/Filters/Filters";

export default function CatalogPage() {
  const dispatch = useDispatch();

  const { items, page, limit, isLoading, error, hasMore } = useSelector(
    (state) => state.campers
  );
  const filters = useSelector((state) => state.filters);

  // Filtreler veya sayfa ilk açıldığında
  useEffect(() => {
    dispatch(resetCampers());
    dispatch(setPage(1));
    dispatch(
      fetchCampers({
        page: 1,
        limit,
        filters,
        append: false,
      })
    );
  }, [dispatch, limit, filters]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(setPage(nextPage));
    dispatch(
      fetchCampers({
        page: nextPage,
        limit,
        filters,
        append: true,
      })
    );
  };

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Campers catalog</h1>

      <div className={styles.layout}>
        <div className={styles.filters}>
          <Filters />
        </div>

        <div className={styles.content}>
          {error && <p className={styles.error}>Error: {error}</p>}

          <div className={styles.list}>
            {items.map((camper) => (
              <CamperCard key={camper.id} camper={camper} />
            ))}
          </div>

          {isLoading && <Loader />}

          {!isLoading && hasMore && items.length > 0 && (
            <button
              className={styles.loadMore}
              onClick={handleLoadMore}
            >
              Load more
            </button>
          )}

          {!isLoading && !hasMore && items.length > 0 && (
            <p className={styles.end}>No more campers</p>
          )}

          {!isLoading && items.length === 0 && !error && (
            <p className={styles.empty}>No campers found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
