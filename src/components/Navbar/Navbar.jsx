import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const getClass = ({ isActive }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          TravelTrucks
        </NavLink>

        <nav className={styles.nav}>
          <NavLink to="/" className={getClass}>
            Home
          </NavLink>
          <NavLink to="/catalog" className={getClass}>
            Catalog
          </NavLink>
          <NavLink to="/favorites" className={getClass}>
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
