import React from 'react';
import styles from "./DashboardSideBar.module.scss"

interface IProps {
}

const DashboardSideBar: React.FC<IProps> = () => {
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <img src="" alt="logo" />
        </div>
        <div className={styles.items}>
        
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.signOut}>
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default DashboardSideBar;