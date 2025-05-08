import { createRoot } from "react-dom/client";
import React from "react";
import App from "./city.jsx";
import Section0 from "./Poetry/section0"; // HTML-based poetry site
import ExistentialPoetry from "./Poetry/existentialPoetry"; // HTML-based poetry site

import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/Celestaris/" element={<App />} />
      <Route path="/Celestaris/Poetry/section0" element={<Section0 />} />
      <Route
        path="/Celestaris/Poetry/existentialPoetry"
        element={<ExistentialPoetry />}
      />
    </Routes>
  </BrowserRouter>
);
console.log("HAPPENED !!");
