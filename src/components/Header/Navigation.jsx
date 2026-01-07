import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Navigation = ({ isLoggedIn, onLinkClick }) => {
  return (
    <nav className={`${styles.nav} ${!isLoggedIn ? styles.authNav : ""}`}>
      {isLoggedIn ? (
        <>
          <NavLink
            to='/diary'
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
            onClick={onLinkClick}
          >
            DIARY
          </NavLink>

          <NavLink
            to='/calculator'
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
            onClick={onLinkClick}
          >
            CALCULATOR
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to='/login'
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
            onClick={onLinkClick}
          >
            LOG IN
          </NavLink>

          <NavLink
            to='/registration'
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
            onClick={onLinkClick}
          >
            REGISTRATION
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigation;