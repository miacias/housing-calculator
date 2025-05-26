import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <StrictMode>
        <App />
    </StrictMode>
  </MantineProvider>
);
