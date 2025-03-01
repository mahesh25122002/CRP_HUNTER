import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' for React 18+
import "./index.css";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
import CryptoContext from "./CryptoContex";

// Create the root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App inside the root element
root.render(
  <React.StrictMode>
    <CryptoContext>
      <App />
    </CryptoContext>
  </React.StrictMode>
);
