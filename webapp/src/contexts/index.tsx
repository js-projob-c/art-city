"use client";

import { AppProvider } from "./AppContext";
import { ThemeProvider } from "./ThemeContext";

interface IProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProps) => {
  return (
    <ThemeProvider>
      <AppProvider>{children}</AppProvider>
    </ThemeProvider>
  );
};

export default Providers;
