import React from "react";
// import ReactDOM from "react-dom/client";
import "./index.css";

import "./App.css";

import { createRoot } from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = createRoot(document.getElementById("root"));
root.render(<App />);

reportWebVitals();
