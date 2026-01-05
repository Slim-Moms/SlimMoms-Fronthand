import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logoIcon from "../../img/svg/logo.svg"; 

const Logo = () => {
  return (
    <Link to="/diary" className={styles.logo}>
      <img src={logoIcon} alt="SlimMom icon" className={styles.logoIcon} />

      <span className={styles.logoText}>
        <span className={styles.slim}>Slim</span>
        <span className={styles.mom}>Mom</span>
      </span>
    </Link>
  );
};

export default Logo;