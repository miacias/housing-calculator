import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import { App } from "./App";
import theme from "./assets/Goomy";

createRoot(document.getElementById("root")!).render(
  <MantineProvider
    theme={theme}
    withGlobalClasses
    withStaticClasses
    defaultColorScheme="dark"
  >
    <StrictMode>
      <App />
    </StrictMode>
  </MantineProvider>
);
