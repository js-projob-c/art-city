"use client";

import { NavLink } from "@mantine/core";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { SideNavbarConfigType } from "@/configs/dashboardSideNavbar";
import { logout } from "@/hooks/features/auth/useLogin";

import styles from "./DashboardSideNavbar.module.scss";

interface IProps {
  currentPathname: string;
  navConfig: any[];
  logoSrc?: string | StaticImageData;
}

const DashboardSideNavbar: React.FC<IProps> = ({
  currentPathname,
  navConfig,
  logoSrc,
}) => {
  const router = useRouter();

  const renderNavLinks: any = (items: SideNavbarConfigType[]) => {
    return items.map((item, i) => {
      const isParent = !!(item.children && item.children?.length > 0);
      // const isExpanded = isParent
      //   ? item?.children?.some((child) => child.href === currentPathname)
      //   : false;

      return (
        <NavLink
          w={"100%"}
          defaultOpened={true}
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

  const onLogout = () => {
    logout();
    router.push("/");
    router.refresh();
  };

  return (
    <div className={`${styles.root}`}>
      <div className={styles.top}>
        {logoSrc && (
          <div className={styles.logo}>
            <Image src={logoSrc} alt="logo" className={styles.logo} />
          </div>
        )}
        <div className={styles.items}>{renderNavLinks(navConfig)}</div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.signOut}>
          <NavLink label={"系統"} childrenOffset={0}>
            <NavLink label={"登出"} onClick={onLogout} />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DashboardSideNavbar;
