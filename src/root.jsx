/**
 * Starts the browser application and configures its client-side routes.
 * @category Setup
 */
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import City from "./city.jsx";
import Portfolio from "./portfolio.jsx";
import NHS from "./nhs.jsx";
import Documentation from "./documentation.jsx";
import Population from "./population.jsx";

import { preloadAllSFX } from "./audioManager.js";

/**
 * Redirects legacy WordPress URLs to the computer scene with the requested page embedded.
 * @returns This component performs navigation in an effect and renders no UI.
 */
const RedirectHandler = () => {
  /**
   * Allows for site navigation
   */
  const navigate = useNavigate();

  /**
   * Retrieves the current page location
   */
  const location = useLocation();

  /**
   * Handles redirect logic
   */
  useEffect(() => {
    // Check for the legacy ?path= param OR a direct URL hit
    const searchParams = new URLSearchParams(location.search);
    const redirectParam = searchParams.get("path");
    const currentPath = location.pathname;

    const basename = "/Celestaris";
    // Determine the path we are dealing with
    let pathToCheck = redirectParam
      ? decodeURIComponent(redirectParam)
      : currentPath;

    // Remove basename to analyze the internal route
    if (pathToCheck.startsWith(basename)) {
      pathToCheck = pathToCheck.substring(basename.length);
    }

    // Identify WordPress content
    const isWP =
      pathToCheck.toLowerCase().includes("portfolio") ||
      pathToCheck.toLowerCase().includes("pages");

    if (isWP) {
      // Ensure it ends in index.html for static serving
      const cleanPath = pathToCheck.endsWith("index.html")
        ? pathToCheck
        : `${pathToCheck}/index.html`;

      console.log("Routing WP to Computer:", cleanPath);
      navigate("/Computer", {
        replace: true,
        state: { iframeUrl: `${basename}${cleanPath}` },
      });
    }
  }, [location, navigate]);

  return null;
};

preloadAllSFX();

/**
 * Mounts the routed application in the page's root element.
 * @returns {void}
 */
createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/Celestaris">
    <RedirectHandler />

    <Routes>
      <Route path="/" element={<City />} />
      <Route path="/Computer" element={<Portfolio />} />
      <Route path="/Documentation" element={<Documentation />} />
      <Route path="/Population" element={<Population />} />
      <Route path="/NHS" element={<NHS />} />

      {/** 
      <Route path="/Poetry/section0" element={<Section0 />} />
      <Route path="/Poetry/existentialPoetry" element={<ExistentialPoetry />} />
        */}
    </Routes>
  </BrowserRouter>,
);
console.log("The site has loaded !!");
