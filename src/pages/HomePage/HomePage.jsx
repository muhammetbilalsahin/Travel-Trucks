import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import heroImg from "../../assets/images/hero.jpg"; 

export default function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/catalog");
  };

  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${heroImg})` }} 
    >
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <p className={styles.subtitle}>
          You can find everything you want in our catalog
        </p>

        <button className={styles.button} onClick={handleClick}>
          View Now
        </button>
      </div>
    </section>
  );
}
