import { useEffect, useState } from "react"
 
import { getPopularMovies } from "../API/moviseAPI"
import type { movie } from "../types/types";
 
import Head from "../components/head"
import Card from "../components/card";
import SkeletonCard from "../components/skeletonCard";
 
export default function Home() {
  const [movies, setMovies] = useState<movie[]>([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const [data, data2, data3] = await Promise.all([
        getPopularMovies(1),
        getPopularMovies(2),
        getPopularMovies(3),
      ]);
      setMovies([...data, ...data2, ...data3]);
      setLoading(false);
    };
 
    fetchMovies();
  }, []);
 
  return (
    <div className="relative min-h-screen bg-bg flex justify-center overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 w-64 h-64 bg-accent/30 rounded-full blur-[100px]" />
      <div className="relative z-10 flex flex-col items-center top-20 gap-20 slideFade">
        <Head />
 
        <div className="sm:w-[90%] w-full flex justify-center sm:gap-5 gap-1 flex-wrap items-center slideFade mb-30">
          {loading
            ? Array.from({ length: 20 }).map((_, i) => <SkeletonCard key={i} />)
            : movies.map((m: movie) => <Card key={m.id} data={m} />)
          }
        </div>
 
      </div>
    </div>
  )
}
