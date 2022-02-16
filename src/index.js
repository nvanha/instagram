import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseContext from "./context/firebase";
import "./index.scss";
import { FieldValue, firebase } from "./lib/firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// client side rendered app: react (cra)
// -> database which is Firebase
// -> react-loading-skeleton
// tailwind

// folder structure
// src
// -> components
// -> constants
// -> context
// -> helpers
// -> hooks
// -> pages
// -> lib (firebase is going to live in here)
// -> services (firebase functions in here)
// -> styles (tailwind's folder (app/tailwind))
