import { createRoot } from "react-dom/client";
import React from "react";
import App from "./city.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(<App />);
console.log("HAPPENED !!");
