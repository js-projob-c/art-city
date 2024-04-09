import React, { ReactNode } from "react";

import { IMAGES } from "@/assets";
import DashboardSideBar from "@/components/DashboardSideNavbar";
import DashboardTopNavbar from "@/components/DashboardTopNavbar";
import { dashboardSideNavbarConfig } from "@/configs/dashboardSideNavbar";

import styles from "./DashboardLayout.module.scss";

interface IProps {
  pathname: string;
  children: ReactNode;
}

const DashboardLayout: React.FC<IProps> = ({ children, pathname }: IProps) => {
  return (
    <div className={styles.root}>
      <DashboardSideBar
        currentPathname={pathname}
        logoSrc={IMAGES.logo}
        navConfig={dashboardSideNavbarConfig}
      />
      <main className={styles.main}>
        <header className={styles.header}>
          <DashboardTopNavbar />
        </header>
        <div className={styles.content}>{children}</div>
        <footer></footer>
      </main>
    </div>
  );
};

export default DashboardLayout;
