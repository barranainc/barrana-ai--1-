import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App, { preloadCurrentRoute } from "./App";
import "./index.css";

// Render only after the current page's chunk is loaded, so the pre-rendered HTML is replaced by the
// real page in one step instead of by a loading fallback (which shifted the layout).
preloadCurrentRoute(window.location.pathname).finally(() => {
  createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
});
