import React from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";
import { applyTheme, getTheme } from "../theme/theme";
import Dashboard from "./Dashboard";

applyTheme(getTheme());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
);
