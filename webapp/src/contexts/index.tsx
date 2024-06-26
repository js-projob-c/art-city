"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/services/query";

import { AppProvider } from "./AppContext";
import { ModalProvider } from "./ModalContext";
import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "./ToastContext";

interface IProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppProvider>
          <ToastProvider>
            <ModalProvider>{children}</ModalProvider>
          </ToastProvider>
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
