import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./features/home/styles/animations.css";
import "./styles/shared-animations.css";
import App from "./App";

const CHUNK_RELOAD_KEY = "vite-preload-reload-at";
const CHUNK_RELOAD_COOLDOWN_MS = 30_000;

window.addEventListener("vite:preloadError", (event) => {
  try {
    const lastReload = Number(sessionStorage.getItem(CHUNK_RELOAD_KEY) ?? "0");
    if (Date.now() - lastReload < CHUNK_RELOAD_COOLDOWN_MS) return;
    sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()));
  } catch {
    return;
  }

  event.preventDefault();
  window.location.reload();
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
