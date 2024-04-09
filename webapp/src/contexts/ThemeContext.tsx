import { MantineProvider } from "@mantine/core";
import React, { createContext, useContext, useState } from "react";

import { mantineTheme } from "@/themes/mantine";

interface ContextProps {}

export const ThemeContext = createContext<any>(undefined);

export const useTheme = () => useContext<ContextProps>(ThemeContext);

export function ThemeProvider(props: any) {
  const values = {};

  return (
    <ThemeContext.Provider value={values}>
      <MantineProvider theme={mantineTheme}>{props.children}</MantineProvider>
    </ThemeContext.Provider>
  );
}
