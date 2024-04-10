"use client";

import { ActionIcon, Avatar, HoverCard, Stack, Text } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import React from "react";

import { useApp } from "@/contexts/AppContext";

import styles from "./DashboardTopNavbar.module.scss";

const DashboardTopNavbar = () => {
  const { setNavbarToggled, isNavbarToggled } = useApp();

  return (
    <div className={`${styles.root} ${isNavbarToggled ? styles.opened : ""}`}>
      <ActionIcon
        variant="default"
        onClick={() => setNavbarToggled(!isNavbarToggled)}
      >
        <IconMenu2 />
      </ActionIcon>
      <HoverCard openDelay={100} closeDelay={400}>
        <HoverCard.Target>
          <Avatar />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Stack>
            <Text size="sm">User: ssdf</Text>
            <Text size="sm">Role: ssdf</Text>
          </Stack>
        </HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
};

export default DashboardTopNavbar;
