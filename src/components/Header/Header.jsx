import Logo from "./Logo";
import Navigation from "./Navigation";
import UserInfo from "./UserInfo";
import styles from "./Header.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUserName,
} from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";

const Header = () => {
  const dispatch = useDispatch(); 
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoNavContainer}>
          <Logo />
          <div className={styles.separator}></div>
          <Navigation isLoggedIn={isLoggedIn} />
        </div>

        {isLoggedIn && <UserInfo userName={userName} onLogout={handleLogout} />}
      </div>
    </header>
  );
};

export default Header;