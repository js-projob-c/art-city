"use client";

import {
  AppShell,
  Avatar,
  Burger,
  Center,
  Flex,
  Group,
  Image,
  Popover,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NextImage from "next/image";
import React, { ReactNode } from "react";

import { IMAGES } from "@/common/assets";
import DashboardSideBar from "@/components/DashboardSideNavbar";
import { dashboardSideNavbarConfig } from "@/configs/dashboardSideNavbar";
import useCurrentUser from "@/hooks/features/useCurrentUser";

import styles from "./DashboardLayout.module.scss";

interface IProps {
  pathname: string;
  children: ReactNode;
}

const DashboardLayout: React.FC<IProps> = ({ children, pathname }: IProps) => {
  const user = useCurrentUser();
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
          <Flex h="100%" px="md" direction={"row"} justify={"space-between"}>
            <Group>
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
            <Center>
              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <Avatar className={styles.avatarButton} />
                </Popover.Target>
                <Popover.Dropdown>
                  <Stack>
                    <Text size="xs">電郵: {user?.email}</Text>
                    <Text size="xs">部門: {user?.department}</Text>
                    <Text size="xs">職位: {user?.role}</Text>
                  </Stack>
                </Popover.Dropdown>
              </Popover>
            </Center>
          </Flex>
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
