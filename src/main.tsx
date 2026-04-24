import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { FavoritesProvider } from './hooks/favoriteContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'



if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("SW registered:", reg))
      .catch((err) => console.log("SW failed:", err));
  });
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavoritesProvider>
      <HelmetProvider>
      <BrowserRouter>
        <App />
        </BrowserRouter>
        </HelmetProvider>
    </FavoritesProvider>
  </StrictMode>,
)
