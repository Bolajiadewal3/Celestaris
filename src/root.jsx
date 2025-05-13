import { createRoot } from "react-dom/client";
import React from "react";
import App from "./city.jsx";
import Section0 from "./Poetry/section0"; // HTML-based poetry site
import ExistentialPoetry from "./Poetry/existentialPoetry"; // HTML-based poetry site

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get("redirect");

    // Ensure the redirectPath starts with "/Celestaris/"
    const isValidPath = redirectPath && redirectPath.startsWith("/Celestaris/");

    if (isValidPath) {
      console.log("Redirecting to: " + redirectPath);
      navigate(redirectPath, { replace: true });
    } else if (redirectPath) {
      console.warn(`Invalid redirect path: ${redirectPath}`);
    }
  }, [location, navigate]);

  return null;
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RedirectHandler />

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
