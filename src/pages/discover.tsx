import SideScroll from "../components/sideScroll";
import Card from "../components/card";
import SkeletonCard from "../components/skeletonCard";
import { useState, useEffect } from "react";
import { getDiscover } from "../API/discoverApi";
import type { movie } from "../types/types";

export default function Discover() {
 

      const [Amovies, setAmovies] = useState<movie[]>([]);
      const [Fmovies, setFmovies] = useState<movie[]>([]);
      const [Dmovies, setDmovies] = useState<movie[]>([]);
      const [Hmovies, setHmovies] = useState<movie[]>([]);
      const [Smovies, setSmovies] = useState<movie[]>([]);
      const [ANmovies, setANmovies] = useState<movie[]>([]);
      const [Tmovies, setTmovies] = useState<movie[]>([]);
      const [ADmovies, setADmovies] = useState<movie[]>([]);

      const [loading, setLoading] = useState(true);
      const skeletonLenth = 10;

   useEffect(() => {
      const fetchMovies = async () => {
        setLoading(true);
        const [Adata, Fdata, Ddata, Hdata, Sdata, ANdata, Tdata, ADdata] = await Promise.all([

          getDiscover(28),
          getDiscover(14),
          getDiscover(18),
          getDiscover(27),
          getDiscover(878),
          getDiscover(16),
          getDiscover(53),
          getDiscover(12),

        ]);

console.log(Adata, Fdata, Ddata, Hdata);

        setAmovies(Adata);
        setFmovies(Fdata);
        setDmovies(Ddata);
        setHmovies(Hdata);
        setSmovies(Sdata);
        setANmovies(ANdata); 
        setTmovies(Tdata);
        setADmovies(ADdata);



        setLoading(false);
      };
   
      fetchMovies();
    }, []);

  return (
  <div className="min-h-screen bg-bg py-5">
    <SideScroll>
     {loading
                 ? Array.from({ length: skeletonLenth }).map((_, i) => <SkeletonCard key={i} />)
                 : Amovies.map((m: movie) => <Card key={m.id} data={m} />)
               }
    </SideScroll>
<SideScroll>
     {loading
                 ? Array.from({ length: skeletonLenth }).map((_, i) => <SkeletonCard key={i} />)
                 : Fmovies.map((m: movie) => <Card key={m.id} data={m} />)
               }
    </SideScroll>

<SideScroll>
     {loading
                 ? Array.from({ length: skeletonLenth }).map((_, i) => <SkeletonCard key={i} />)
                 : Dmovies.map((m: movie) => <Card key={m.id} data={m} />)
               }
    </SideScroll>

    <SideScroll>
     {loading
                 ? Array.from({ length: skeletonLenth }).map((_, i) => <SkeletonCard key={i} />)
                 : Hmovies.map((m: movie) => <Card key={m.id} data={m} />)
               }
    </SideScroll>
    <SideScroll>
     {loading
                 ? Array.from({ length: skeletonLenth }).map((_, i) => <SkeletonCard key={i} />)
                 : Smovies.map((m: movie) => <Card key={m.id} data={m} />)
               }
    </SideScroll>
    <SideScroll>
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
    </SideScroll>
  </div>
  );
}
