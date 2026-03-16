import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

/**
 * Application entry point.
 *
 * BrowserRouter is mounted here (at the top of the component tree) so that
 * every component in the app can use React Router hooks (useNavigate,
 * useLocation, NavLink, etc.) without needing to pass navigation callbacks
 * down through props.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
