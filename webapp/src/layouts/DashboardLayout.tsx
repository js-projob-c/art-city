"use client";

import { AppShell, Burger, Group, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NextImage from "next/image";
import React, { ReactNode } from "react";

import { IMAGES } from "@/common/assets";
import DashboardSideBar from "@/components/DashboardSideNavbar";
import { dashboardSideNavbarConfig } from "@/configs/dashboardSideNavbar";

import styles from "./DashboardLayout.module.scss";

interface IProps {
  pathname: string;
  children: ReactNode;
}

const DashboardLayout: React.FC<IProps> = ({ children, pathname }: IProps) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <div>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
        className={styles.root}
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <Image
              component={NextImage}
              src={IMAGES.logoRec}
              alt="logo"
              fit="contain"
              className={styles.logo}
            />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <DashboardSideBar
            currentPathname={pathname}
            navConfig={dashboardSideNavbarConfig}
          />
        </AppShell.Navbar>
        <AppShell.Main className={`${styles.main}`}>
          {children}
          <footer></footer>
        </AppShell.Main>
      </AppShell>
    </div>
  );
};

export default DashboardLayout;
