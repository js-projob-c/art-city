"use client";

import { Button } from "@mantine/core";
import React from "react";

import { useApp } from "@/contexts/AppContext";

const DashboardTopNavbar = () => {
  const { setNavbarToggled, isNavbarToggled } = useApp();

  return (
    <div>
      <p>
        <Button onClick={() => setNavbarToggled(!isNavbarToggled)}>sd</Button>
      </p>
    </div>
  );
};

export default DashboardTopNavbar;
