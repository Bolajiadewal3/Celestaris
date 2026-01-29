import { createRoot } from "react-dom/client";
import React from "react";
import App from "./city.jsx";
import Section0 from "./Poetry/section0.jsx"; // HTML-based poetry site
import ExistentialPoetry from "./Poetry/existentialPoetry.jsx"; // HTML-based poetry site

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Portfolio from "./portfolio.jsx";
import Documentation from "./documentation.jsx";

const RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get("path");

    console.log("Raw Path:", redirectPath);
    console.log("Current Path:", location.pathname);

    if (redirectPath) {
      try {
        const decodedPath = decodeURIComponent(redirectPath);
        console.log("Decoded Path:", decodedPath);

        if (decodedPath !== location.pathname) {
          console.log("Navigating to:", decodedPath);
          navigate(decodedPath, { replace: true });
        }
      } catch (error) {
        console.error("Error decoding path:", error);
      }
    }
  }, [location, navigate]);

  return null;
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/Celestaris">
    <RedirectHandler />

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Computer" element={<Portfolio />} />
      <Route path="/Documentation" element={<Documentation />} />

      <Route path="/Poetry/section0" element={<Section0 />} />
      <Route path="/Poetry/existentialPoetry" element={<ExistentialPoetry />} />
    </Routes>
  </BrowserRouter>,
);
console.log("HAPPENED !!");
