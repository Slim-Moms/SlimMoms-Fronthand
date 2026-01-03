import styles from "./Header.module.css";

const UserInfo = ({ userName, onLogout }) => {
  return (
    <div className={styles.userInfo}>
      <span className={styles.userName}>{userName}</span>
      <div className={styles.separator}></div>
      <button
        type="button"
        className={styles.logoutBtn}
        onClick={onLogout}
      >
        Exit
      </button>
    </div>
  );
};

export default UserInfo;