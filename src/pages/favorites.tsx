import { useEffect, useState } from "react";
import type { movie } from "../types/types";
import { useFavorites } from "../hooks/favoriteContext";
import { getDetails } from "../API/moviesDetailsAPI";
import Card from "../components/card";

export default function Favorites() {
  const { favorites } = useFavorites();
  const [movies, setMovies] = useState<movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);

      // ✅ بنعمل API call لكل favorite عشان نجيب بياناته الكاملة
      const results = await Promise.all(
        favorites.map((fav) =>
          getDetails(fav.media_type, String(fav.id))
        )
      );

      // ✅ بنضيف media_type لكل نتيجة لأن الـ API مش بيرجعه
      const moviesWithType: movie[] = results.map((data, i) => ({
        ...data,
        media_type: favorites[i].media_type,
      }));

      setMovies(moviesWithType);
      setLoading(false);
    };

    if (favorites.length > 0) {
      fetchFavorites();
    } else {
      setMovies([]);
      setLoading(false);
    }
  }, [favorites]);

  return (
    <div className="relative min-h-screen bg-bg flex justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center top-20 gap-20 slideFade w-full">

        <h1 className="text-accent text-4xl curseve">My Favorites</h1>

        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : movies.length === 0 ? (
          <p className="text-muted">No favorites yet. Start adding some! ❤️</p>
        ) : (
          <div className="sm:w-[90%] w-full flex justify-center gap-5 flex-wrap items-center slideFade mb-30">
            {movies.map((m: movie) => (
              <Card key={m.id} data={m} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}