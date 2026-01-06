import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Navigation = ({ isLoggedIn }) => {
  return (
    <nav className={`${styles.nav} ${!isLoggedIn ? styles.authNav : ""}`}>
      {isLoggedIn ? (
        <>
          <NavLink
            to='/diary'
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
          >
            DIARY
          </NavLink>

          <NavLink
            to='/calculator'
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
          >
            CALCULATOR
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to='/login'
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
          >
            LOG IN
          </NavLink>

          <NavLink
            to='/registration'
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
          >
            REGISTRATION
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigation;