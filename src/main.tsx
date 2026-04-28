import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { FavoritesProvider } from './hooks/favoriteContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import { PhotoProvider } from './hooks/PhotoViewContext.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavoritesProvider>
      <PhotoProvider>
      <HelmetProvider>
      <BrowserRouter>
        <App />
        </BrowserRouter>
        </HelmetProvider>
        </PhotoProvider>
    </FavoritesProvider>
  </StrictMode>,
)
