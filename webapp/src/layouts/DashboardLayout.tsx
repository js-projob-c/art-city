"use client";

import { Flex } from "@mantine/core";
import React, { ReactNode } from "react";

import { IMAGES } from "@/assets";
import DashboardSideBar from "@/components/DashboardSideNavbar";
import DashboardTopNavbar from "@/components/DashboardTopNavbar";
import { dashboardSideNavbarConfig } from "@/configs/dashboardSideNavbar";
import { useApp } from "@/contexts/AppContext";

import styles from "./DashboardLayout.module.scss";

interface IProps {
  pathname: string;
  children: ReactNode;
}

const DashboardLayout: React.FC<IProps> = ({ children, pathname }: IProps) => {
  const { isNavbarToggled } = useApp();

  const sidebarOpenedClassName = !isNavbarToggled ? styles.closed : "";

  return (
    <div className={styles.root}>
      <div className={`${styles.sidebar} ${sidebarOpenedClassName}`}>
        <DashboardSideBar
          currentPathname={pathname}
          logoSrc={IMAGES.logoRec}
          navConfig={dashboardSideNavbarConfig}
        />
      </div>
      <main className={`${styles.main} ${sidebarOpenedClassName}`}>
        <header className={styles.header}>
          <DashboardTopNavbar />
        </header>
        <Flex className={styles.content} p="sm">
          {children}
        </Flex>
        <footer></footer>
      </main>
    </div>
  );
};

export default DashboardLayout;
