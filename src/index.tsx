import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './styles.css';
import AppHeader from "./components/AppHeader";



const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
