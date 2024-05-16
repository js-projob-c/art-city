"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppProvider } from "./AppContext";
import { ThemeProvider } from "./ThemeContext";

interface IProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const Providers = ({ children }: IProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppProvider>{children}</AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
