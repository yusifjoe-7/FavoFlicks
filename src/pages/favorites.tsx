import { useEffect, useState, useRef, useCallback } from "react";
import type { movie } from "../types/types";
import { useFavorites } from "../hooks/favoriteContext";
import { getDetails } from "../API/moviesDetailsAPI";
import Card from "../components/card";

export default function Favorites() {
  const { favorites } = useFavorites();
  const [movies, setMovies] = useState<movie[]>([]);

  const [frLoading, setFrLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [page, setPage] = useState<number>(1);
  const limit = 10;
const endRef= useRef<HTMLDivElement | null>(null);
const [hasMore, setHasMore] = useState<boolean>(true);

const loadingRef = useRef(false);
const hasMoreRef = useRef(true);




useEffect(() => { loadingRef.current = loading; }, [loading]);
useEffect(() => { hasMoreRef.current = hasMore; }, [hasMore]);

const handleScroll = useCallback(() => {
  if (
    window.innerHeight + document.documentElement.scrollTop + 50 >=
      document.documentElement.offsetHeight &&
    !loadingRef.current &&
    hasMoreRef.current
  ) {
    setPage((prev) => prev + 1);
  }
}, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
  }, []);
 

  useEffect(() => {
  const fetchFavorites = async () => {
    page === 1 ? setFrLoading(true) : setLoading(true);

    const favoritesToFetch = favorites.slice((page - 1) * limit, page * limit);

    if (favoritesToFetch.length === 0) {
      setHasMore(false);
      setLoading(false);
      setFrLoading(false);
      // ✅ امسح الـ movies لو مفيش favorites خالص
      if (page === 1) setMovies([]);
      return;
    }

    const results = await Promise.all(
      favoritesToFetch.map((fav) => getDetails(fav.media_type, String(fav.id)))
    );

    const moviesResults: movie[] = results.map((data, i) => ({
      ...data,
      media_type: favoritesToFetch[i].media_type,
    }));

    // ✅ لو page === 1 يعني favorites اتغير أو أول load، استبدل الكل
    if (page === 1) {
      setMovies(moviesResults);
    } else {
      setMovies((prev) => [...prev, ...moviesResults]);
    }

    setHasMore(favoritesToFetch.length === limit);
    setLoading(false);
    setFrLoading(false);
  };

  if (favorites.length > 0) {
    fetchFavorites();
  } else {
    setMovies([]);
    setLoading(false);
    setFrLoading(false);
  }
}, [page]);

  return (<div className="relative min-h-screen bg-bg flex justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center top-20 gap-20 slideFade w-full">
        <h1 className="text-accent text-4xl curseve">My Favorites</h1>

        {/* ✅ حالة مفيش favorites خالص */}
        {!loading && !frLoading && movies.length === 0 && (
          <p className="text-muted">No favorites yet. Start adding some! ❤️</p>
        )}
        {!loading && frLoading && movies.length >= 0 && (
          <img src={"/favoflicks_star.svg"} alt="loading suv" className="suv-around w-5 mx-2" />
        )}
        {/* ✅ الـ cards دايماً موجودة في الـ DOM */}
        <div className="sm:w-[90%] w-full flex justify-center gap-5 flex-wrap items-center slideFade mb-30">
          {movies.map((m: movie) => (
            <Card key={m.id} data={m} />
          ))}
        </div>
        {loading && <img src={"/favoflicks_star.svg"} alt="loading suv" className="suv-around w-5 -translate-y-25" />}

        {/* ✅ endRef دايماً موجود في الـ DOM */}
        <div ref={endRef} className="h-2 w-full" />

        
        

      
      </div>
    </div>
  );
}