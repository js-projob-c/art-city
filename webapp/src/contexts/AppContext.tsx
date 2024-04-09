import React, { createContext, useContext, useState } from "react";

interface ContextProps {
  isNavbarToggled: boolean;
  setNavbarToggled: (isToggled: boolean) => void;
}

export const AppContext = createContext<any>(undefined);

export const useApp = () => useContext<ContextProps>(AppContext);

export function AppProvider(props: any) {
  const [isNavbarToggled, setIsNavbarToggled] = useState(true);

  const setNavbarToggled = (isToggled: boolean) =>
    setIsNavbarToggled(isToggled);

  const values = {
    isNavbarToggled,
    setNavbarToggled,
  };

  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
}
