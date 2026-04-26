import SideScroll from "../components/sideScroll";
import Card from "../components/card";
import SkeletonCard from "../components/skeletonCard";
import { useState, useEffect } from "react";
import { getTrendingDay, getTopRated, getDiscover} from "../API/discoverApi";
import type { movie } from "../types/types";

export default function Discover() {
 

      const [Amovies, setAmovies] = useState<movie[]>([]);
      const [Fmovies, setFmovies] = useState<movie[]>([]);
      const [Dmovies, setDmovies] = useState<movie[]>([]);
      const [Hmovies, setHmovies] = useState<movie[]>([]);
      const [Smovies, setSmovies] = useState<movie[]>([]);
      // const [ANmovies, setANmovies] = useState<movie[]>([]);
      // const [Tmovies, setTmovies] = useState<movie[]>([]);
      // const [ADmovies, setADmovies] = useState<movie[]>([]);

      const [loading, setLoading] = useState(true);
      const skeletonLenth = 10;

   useEffect(() => {
      const fetchMovies = async () => {
        setLoading(true);
        const [Adata, Fdata, Ddata, Hdata, Sdata] = await Promise.all([
          //, ANdata, Tdata, ADdata
          getTrendingDay(),
          getDiscover("movie"),
          getDiscover("tv"),
          getTopRated("movie"),
          getTopRated("tv"),
          

        ]);

        setAmovies(Adata);
        setFmovies(Fdata);
        setDmovies(Ddata);
        setHmovies(Hdata);
        setSmovies(Sdata);
        // setANmovies(ANdata);
        // setTmovies(Tdata);
        // setADmovies(ADdata);



        



        setLoading(false);
      };
   
      fetchMovies();
    }, []);

  return (
  <div className="min-h-screen bg-bg py-5">
    <span className="block text-2xl sm:text-3xl font-bold ml-10 sm:ml-20 sm:mt-3 mt-5 sm:mb-10 mb-5">- trending <span className="curseve text-accent">today</span></span>
    <SideScroll>
     {loading
                 ? Array.from({ length: skeletonLenth }).map((_, i) => <SkeletonCard key={i} />)
                 : Amovies.map((m: movie) => <Card key={m.id} data={m} />)
               }
    </SideScroll>
    <span className="block text-2xl sm:text-3xl font-bold ml-10 sm:ml-20 sm:mb-10 my-5">- top rated <span className="curseve text-accent">movies</span></span>
    <SideScroll>
     {loading
                 ? Array.from({ length: skeletonLenth }).map((_, i) => <SkeletonCard key={i} />)
                 : Hmovies.map((m: movie) => <Card key={m.id} data={m} index="movie" />)
               }
    </SideScroll>
    <span className="block text-2xl sm:text-3xl font-bold ml-10 sm:ml-20 sm:mb-10 my-5">- top rated <span className="curseve text-accent">tv shows</span></span>
    <SideScroll>
     {loading
                 ? Array.from({ length: skeletonLenth }).map((_, i) => <SkeletonCard key={i} />)
                 : Smovies.map((m: movie) => <Card key={m.id} data={m} index="tv" />)
               }
    </SideScroll>

    <span className="block text-2xl sm:text-3xl font-bold ml-10 sm:ml-20 sm:mb-10 my-5">- discover <span className="curseve text-accent">movies</span></span>
<SideScroll>
     {loading
                 ? Array.from({ length: skeletonLenth }).map((_, i) => <SkeletonCard key={i} />)
                 : Fmovies.map((m: movie) => <Card key={m.id} data={m} index="movie" />)
               }
    </SideScroll>
    <span className="block text-2xl sm:text-3xl font-bold ml-10 sm:ml-20 sm:mb-10 my-5">- discover <span className="curseve text-accent">tv shows</span></span>
<SideScroll>
     {loading
                 ? Array.from({ length: skeletonLenth }).map((_, i) => <SkeletonCard key={i} />)
                 : Dmovies.map((m: movie) => <Card key={m.id} data={m} index="tv" />)
               }
    </SideScroll>
    
    {/* <SideScroll>
     {loading
                 ? Array.from({ length: skeletonLenth }).map((_, i) => <SkeletonCard key={i} />)
                 : Tmovies.map((m: movie) => <Card key={m.id} data={m} />)
               }
    </SideScroll>
    <SideScroll>
     {loading
                 ? Array.from({ length: skeletonLenth }).map((_, i) => <SkeletonCard key={i} />)
                 : ANmovies.map((m: movie) => <Card key={m.id} data={m} />)
               }
    </SideScroll>
    <SideScroll>
     {loading
                 ? Array.from({ length: skeletonLenth }).map((_, i) => <SkeletonCard key={i} />)
                 : ADmovies.map((m: movie) => <Card key={m.id} data={m} />)
               }
    </SideScroll> */}
  </div>
  );
}
