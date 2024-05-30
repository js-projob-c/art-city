import { ModalsProvider } from "@mantine/modals";
import React, { createContext, useContext } from "react";

interface ContextProps {}

export const ModalContext = createContext<any>(undefined);

export const useModal = () => useContext<ContextProps>(ModalContext);

export function ModalProvider(props: any) {
  const values = {};

  return (
    <ModalContext.Provider value={values}>
      <ModalsProvider>{props.children}</ModalsProvider>
    </ModalContext.Provider>
  );
}
