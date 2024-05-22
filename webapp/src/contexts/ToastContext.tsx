import { MantineProvider } from "@mantine/core";
import React, { createContext, useContext, useState } from "react";
import { Toaster } from "react-hot-toast";

interface ContextProps {}

export const ToastContext = createContext<any>(undefined);

export const useToast = () => useContext<ContextProps>(ToastContext);

export function ToastProvider(props: any) {
  const values = {};

  return (
    <ToastContext.Provider value={values}>
      <Toaster position="top-center" />
      {props.children}
    </ToastContext.Provider>
  );
}
