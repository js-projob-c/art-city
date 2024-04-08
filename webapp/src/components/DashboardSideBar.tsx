import Image from "next/image";
import React from "react";

import { IMAGES } from "@/assets";

import styles from "./DashboardSideBar.module.scss";

interface IProps {}

const DashboardSideBar: React.FC<IProps> = () => {
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <Image src={IMAGES.logo} alt="logo" className={styles.logo} />
        </div>
        <div className={styles.items}></div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.signOut}>Sign Out</div>
      </div>
    </div>
  );
};

export default DashboardSideBar;
