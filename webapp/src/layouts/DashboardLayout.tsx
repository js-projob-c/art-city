"use client";

import { UserRole } from "@art-city/common/enums";
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
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useCallback, useEffect } from "react";

import { IMAGES } from "@/common/assets";
import DashboardSideBar from "@/components/DashboardSideNavbar";
import {
  dashboardSideNavbarConfig,
  SideNavbarConfigType,
} from "@/configs/dashboardSideNavbar";
import useCurrentUser from "@/hooks/features/useCurrentUser";

import styles from "./DashboardLayout.module.scss";

interface IProps {
  pathname: string;
  children: ReactNode;
}

function findNested(
  config: SideNavbarConfigType,
  pathname: string
): SideNavbarConfigType | null {
  if (config.href === pathname) {
    return config;
  }

  if (config.children) {
    for (let i = 0; i < (config.children || []).length; i++) {
      const result = findNested(config.children[i], pathname);
      if (result) {
        return result;
      }
    }
  }

  return null;
}

const DashboardLayout: React.FC<IProps> = ({ children, pathname }: IProps) => {
  const path = usePathname();
  const router = useRouter();
  const user = useCurrentUser();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const validateRoleAndRedirect = useCallback(
    (userRole: UserRole, config: SideNavbarConfigType) => {
      const matchPath = findNested(config, path);
      const isRoleValid = !config.roles || config.roles.includes(userRole);

      if (matchPath && !isRoleValid) {
        router.replace("/dashboard");
        return;
      }

      if (config.children) {
        config.children.forEach((child) => {
          validateRoleAndRedirect(userRole, child);
        });
      }
    },
    [path, router]
  );

  useEffect(() => {
    if (user?.role && path) {
      dashboardSideNavbarConfig.forEach((config) => {
        validateRoleAndRedirect(user.role, config);
      });
    }
  }, [validateRoleAndRedirect, path, user?.role]);

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
