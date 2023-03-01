import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/base.css";
import "./css/screen.css";
import "./css/window.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
