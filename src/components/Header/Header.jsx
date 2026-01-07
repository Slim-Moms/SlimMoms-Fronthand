import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Navigation from "./Navigation";
import UserInfo from "./UserInfo";
import styles from "./Header.module.css";
import { selectIsLoggedIn, selectUserName } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleDiaryOpen = () => setIsDiaryModalOpen(true);
    const handleDiaryClose = () => setIsDiaryModalOpen(false);
    window.addEventListener('openDiaryMobileForm', handleDiaryOpen);
    window.addEventListener('closeDiaryMobileForm', handleDiaryClose);
    return () => {
      window.removeEventListener('openDiaryMobileForm', handleDiaryOpen);
      window.removeEventListener('closeDiaryMobileForm', handleDiaryClose);
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logoNavContainer}>
            <Logo />
            {!isLoggedIn && (
              <div className={styles.desktopNav}>
                <div className={styles.separator}></div>
                <Navigation isLoggedIn={isLoggedIn} />
              </div>
            )}
          </div>
          {isLoggedIn && (
            <>
              <div className={styles.desktopNav}>
                <div className={styles.separator}></div>
                <Navigation isLoggedIn={isLoggedIn} />
              </div>
              <div className={styles.userActions}>
                <UserInfo userName={userName} onLogout={handleLogout} />
                <button 
                  className={styles.menuToggle}
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <span className={styles.closeIcon}>✕</span>
                  ) : (
                    <span className={styles.menuIcon}>☰</span>
                  )}
                </button>
              </div>
            </>
          )}
          {!isLoggedIn && (
            <div className={styles.mobileAuthNav}>
              <Navigation isLoggedIn={isLoggedIn} />
            </div>
          )}
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={closeMenu}>
          <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <Navigation isLoggedIn={isLoggedIn} onLinkClick={closeMenu} />
          </div>
        </div>
      )}

      {/* Mobile user bar (below header) */}
      {isLoggedIn && (
        <div className={`${styles.mobileUserBar} ${isDiaryModalOpen ? styles.mobileUserBarWithBack : ''}`}>
          {isDiaryModalOpen && (
            <button
              type="button"
              className={styles.mobileBackBtn}
              aria-label="Close diary form"
              onClick={() => window.dispatchEvent(new CustomEvent('closeDiaryMobileForm'))}
            >
              ←
            </button>
          )}
          <UserInfo userName={userName} onLogout={handleLogout} />
        </div>
      )}
    </>
  );
};

export default Header;
