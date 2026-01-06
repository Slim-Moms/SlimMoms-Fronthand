import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import styles from "./Header.module.css";
import logoIcon from "../../img/svg/logo.svg"; 

const Logo = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/diary");
    } else {
      navigate("/");
    }
  };

  return (
    <Link 
      to={isLoggedIn ? "/diary" : "/"} 
      className={styles.logo}
      onClick={handleLogoClick}
    >
      <img src={logoIcon} alt="SlimMom icon" className={styles.logoIcon} />

      <span className={styles.logoText}>
        <span className={styles.slim}>Slim</span>
        <span className={styles.mom}>Mom</span>
      </span>
    </Link>
  );
};

export default Logo;