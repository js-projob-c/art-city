// core styles are required for all Mantine packages
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { createTheme } from "@mantine/core";

export const mantineTheme = createTheme({
  /** Put your mantine theme override here */
  primaryColor: "gray",
});
