import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { OpenProvider } from './hooks/movieDetailsContext.tsx'
import { FavoritesProvider } from './hooks/favoriteContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavoritesProvider>
    <OpenProvider>
      <App />
    </OpenProvider>
    </FavoritesProvider>
  </StrictMode>,
)
