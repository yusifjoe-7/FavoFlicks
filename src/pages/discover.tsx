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

      const [loading1, setLoading1] = useState(true);
       const [loading2, setLoading2] = useState(true);
       const [loading3, setLoading3] = useState(true);
       const [loading4, setLoading4] = useState(true);
       const [loading5, setLoading5] = useState(true);
       // const [loading6, setLoading6] = useState(true);


      const skeletonLenth = 10;

   useEffect(() => {
      const fetchMovies = async () => {
        setLoading1(true);
       setLoading2(true)
       setLoading3(true)
       setLoading4(true)
       setLoading5(true)
       // setLoading6(true)


         
         const Adata= await getTrendingDay();
        setAmovies(Adata);
        setLoading1(false);


          const Fdata= await getDiscover("movie");
          setFmovies(Fdata);
          setLoading2(false);


          const Ddata= await getDiscover("tv");
          setDmovies(Ddata);
          setLoading3(false);


          const Hdata= await getTopRated("movie");
          setHmovies(Hdata);
          setLoading4(false);



          const Sdata= await getTopRated("tv");
          setSmovies(Sdata);
          setLoading5(false);


        

        
        
        
        
        
        // setANmovies(ANdata);
        // setTmovies(Tdata);
        // setADmovies(ADdata);

      };
   
      fetchMovies();
    }, []);

  return (
  <div className="min-h-screen bg-bg py-5">
    <span className="block text-2xl sm:text-3xl font-bold ml-10 sm:ml-20 sm:mt-3 mt-5 sm:mb-10 mb-5">- trending <span className="curseve text-accent">today</span></span>
    <SideScroll>
     {loading1
                 ? Array.from({ length: skeletonLenth }).map((_, i) => <SkeletonCard key={i} />)
                 : Amovies.map((m: movie) => <Card key={m.id} data={m} />)
               }
    </SideScroll>
    <span className="block text-2xl sm:text-3xl font-bold ml-10 sm:ml-20 sm:mb-10 my-5">- top rated <span className="curseve text-accent">movies</span></span>
    <SideScroll>
     {loading2
                 ? Array.from({ length: skeletonLenth }).map((_, i) => <SkeletonCard key={i} />)
                 : Hmovies.map((m: movie) => <Card key={m.id} data={m} index="movie" />)
               }
    </SideScroll>
    <span className="block text-2xl sm:text-3xl font-bold ml-10 sm:ml-20 sm:mb-10 my-5">- top rated <span className="curseve text-accent">tv shows</span></span>
    <SideScroll>
     {loading3
                 ? Array.from({ length: skeletonLenth }).map((_, i) => <SkeletonCard key={i} />)
                 : Smovies.map((m: movie) => <Card key={m.id} data={m} index="tv" />)
               }
    </SideScroll>

    <span className="block text-2xl sm:text-3xl font-bold ml-10 sm:ml-20 sm:mb-10 my-5">- discover <span className="curseve text-accent">movies</span></span>
<SideScroll>
     {loading4
                 ? Array.from({ length: skeletonLenth }).map((_, i) => <SkeletonCard key={i} />)
                 : Fmovies.map((m: movie) => <Card key={m.id} data={m} index="movie" />)
               }
    </SideScroll>
    <span className="block text-2xl sm:text-3xl font-bold ml-10 sm:ml-20 sm:mb-10 my-5">- discover <span className="curseve text-accent">tv shows</span></span>
<SideScroll>
     {loading5
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
