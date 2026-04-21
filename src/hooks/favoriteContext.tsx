import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
 
// ✅ بدل ما نخزّن ID بس، بنخزّن object فيه id و media_type
type FavoriteItem = {
  id: string;
  media_type: "movie" | "tv";
};
 
type FavoritesContextType = {
  favorites: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
};
 
const FavoritesContext = createContext<FavoritesContextType | null>(null);
 
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
 
  // load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);
 
  // toggle favorite
  const toggleFavorite = (item: FavoriteItem) => {
    const exists = favorites.some((f) => f.id === item.id);
    const newFavorites = exists
      ? favorites.filter((f) => f.id !== item.id)
      : [...favorites, item];
 
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };
 
  // check favorite
  const isFavorite = (id: string) => {
    return favorites.some((f) => f.id === id);
  };
 
  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
 
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used inside FavoritesProvider");
  return context;
};