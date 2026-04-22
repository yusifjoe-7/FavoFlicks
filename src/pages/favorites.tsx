import { useEffect, useState, useRef } from "react";
import type { movie } from "../types/types";
import { useFavorites } from "../hooks/favoriteContext";
import { getDetails } from "../API/moviesDetailsAPI";
import Card from "../components/card";

export default function Favorites() {
  const { favorites } = useFavorites();
  const [movies, setMovies] = useState<movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;
const endRef= useRef<HTMLDivElement | null>(null);
const [hasMore, setHasMore] = useState<boolean>(true);


    const handleScroll = () => {
      
    if(window.innerHeight+ document.documentElement.scrollTop + window.innerHeight/2 + 100 >= document.documentElement.offsetHeight && !loading && hasMore){
      
      setPage((prev) => prev + 1);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
 

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);

      const favoritesToFetch = favorites.slice((page - 1) * limit, page * limit);

      if (favoritesToFetch.length === 0) {
      setHasMore(false);
      setLoading(false);
      return;
    }

      // ✅ بنعمل API call لكل favorite عشان نجيب بياناته الكاملة
      const results = await Promise.all(
        favoritesToFetch.map((fav) =>
          getDetails(fav.media_type, String(fav.id))
        )
      );

      // ✅ بنضيف media_type لكل نتيجة لأن الـ API مش بيرجعه
      const moviesWithType: movie[] = results.map((data, i) => ({
        ...data,
        media_type: favoritesToFetch[i].media_type,
      }));

      setMovies((prev) => [...prev, ...moviesWithType]);
    setLoading(false);
    };

    if (favorites.length > 0) {
      fetchFavorites();
    } else {
      setMovies([]);
      setLoading(false);
    }
  }, [favorites, page]);

  return (<div className="relative min-h-screen bg-bg flex justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center top-20 gap-20 slideFade w-full">
        <h1 className="text-accent text-4xl curseve">My Favorites</h1>

        {/* ✅ حالة مفيش favorites خالص */}
        {!loading && movies.length === 0 && (
          <p className="text-muted">No favorites yet. Start adding some! ❤️</p>
        )}

        {/* ✅ الـ cards دايماً موجودة في الـ DOM */}
        <div className="sm:w-[90%] w-full flex justify-center gap-5 flex-wrap items-center slideFade mb-30">
          {movies.map((m: movie) => (
            <Card key={m.id} data={m} />
          ))}
        </div>

        {/* ✅ endRef دايماً موجود في الـ DOM */}
        <div ref={endRef} className="h-2 w-full" />

        {/* ✅ Spinner تحت الـ cards */}
        {loading && <p className="text-muted">Loading...</p>}

        {/* ✅ رسالة لو خلصت الداتا */}
        {!hasMore && movies.length > 0 && (
          <p className="text-center text-gray-400 py-4">لا يوجد المزيد ✅</p>
        )}
      </div>
    </div>
  );
}