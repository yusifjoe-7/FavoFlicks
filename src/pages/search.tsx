import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { movie } from "../types/types";
import { getSearch } from "../API/searchApi";
import Card from "../components/card"
import SkeletonCard from "../components/skeletonCard";
import AppSearchBar from "../components/AppSearchBar";



export default function Search() {
  const [movies, setMovies] = useState<movie[]>([]);
const [loading, setLoading] = useState(true);

const [searchParams] = useSearchParams();
  const query = searchParams.get("query"); 

  useEffect(() => {
    if (query) {
      const fatchMovies = async () => {
        setLoading(true);
        const res = await (
          getSearch(query)
        );
        setMovies(res);
        setLoading(false);
      }
      fatchMovies();
      
    }
  }, [query]);

  return (
    <div className="relative min-h-screen bg-bg flex justify-center overflow-hidden">
          <div className="relative z-10 flex flex-col items-center top-20 gap-20 slideFade w-full">
    
            <div className="w-full px-20 ">
              <h1 className="text-accent text-4xl curseve flex items-center">you searched for <span className=" text-amber-50 ml-3 sm:text-xl text-sm font-serif"> {query}</span></h1>
            </div>
            <AppSearchBar />
            {query && loading ? (
              <div className="sm:w-full w-full flex justify-center gap-5 flex-wrap items-center">
    {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
  </div>
            ) : movies.length === 0 ? (
              <p className="text-muted">....</p>
            ) : (
              <div className="sm:w-[90%] w-full flex justify-center gap-5 flex-wrap items-center slideFade mb-30">
                {movies.map((m: movie) => (
                  <Card key={m.id} data={m} />
                ))}
              </div>
            )}
    
          </div>
        </div>
  )
}
