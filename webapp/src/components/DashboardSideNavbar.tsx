"use client";

import { NavLink } from "@mantine/core";
import Image, { StaticImageData } from "next/image";
import React from "react";

import { SideNavbarConfigType } from "@/configs/dashboardSideNavbar";
import { useApp } from "@/contexts/AppContext";

import styles from "./DashboardSideNavbar.module.scss";

interface IProps {
  currentPathname: string;
  navConfig: any[];
  logoSrc: string | StaticImageData;
}

const DashboardSideNavbar: React.FC<IProps> = ({
  currentPathname,
  navConfig,
  logoSrc,
}) => {
  const { isNavbarToggled } = useApp();

  const renderNavLinks = (items: SideNavbarConfigType[]) => {
    return items.map((item, i) => {
      const isParent = !!(item.children && item.children?.length > 0);
      const isExpanded = isParent
        ? item?.children?.some((child) => child.href === currentPathname)
        : false;

      return (
        <NavLink
          w={"100%"}
          defaultOpened={isExpanded}
          active={currentPathname === item.href}
          href={item.href ?? ""}
          label={item.label}
          key={item.href + i}
        >
          {item.children &&
            item.children?.length > 0 &&
            renderNavLinks(item.children)}
        </NavLink>
      );
    });
  };

  return (
    <div className={`${styles.root} ${isNavbarToggled ? styles.opened : ""}`}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <Image src={logoSrc} alt="logo" className={styles.logo} />
        </div>
        <div className={styles.items}>{renderNavLinks(navConfig)}</div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.signOut}>
          <NavLink label={"系統"} childrenOffset={0}>
            <NavLink label={"登出"} />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DashboardSideNavbar;
