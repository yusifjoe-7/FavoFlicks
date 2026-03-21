import { useState, useEffect } from "react";
import type { movieDetails,cast, movie } from "../types/types";
import { getDetails,getCast, getSemMovies } from "../API/moviesDetailsAPI";
import CloseIcon from '@mui/icons-material/Close';
import { useOpen } from "../hooks/movieDetailsContext";
import { useFavorites } from "../hooks/favoriteContext";
import FavoriteBut from "./favoriteBut";
import AddtofavBut from "./addtofavBut";
import SideScroll from "./sideScroll";
import CastCard from "./castCard";
import Card from "./card";


export default function MovieDetails() {


  const [movieDetails, setMovieDetails] = useState<movieDetails>()
  const [cast, setCast] = useState<cast[]>([])
  const [semelarMovies, setSemelarMovies] = useState<movie[]>([])

  const { close, value } = useOpen()

   const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    const fetchMovies = async () => {
       const [movies, cast, sim] = await Promise.all([
                getDetails(value.media_type, String(value.id)),
                getCast(value.media_type, String(value.id)),
                getSemMovies(value.media_type, String(value.id))
                
              ]);
      setMovieDetails(movies);
      setCast(cast);
      setSemelarMovies(sim);
    };

    fetchMovies();
  }, []);
  if (!movieDetails) return <div>Loading...</div>
  console.log(movieDetails)
  console.log(cast)

  //----
  const backdrop = "https://image.tmdb.org/t/p/w500" + movieDetails.backdrop_path;
  const poster = "https://image.tmdb.org/t/p/w500" + movieDetails.poster_path;
  const title = movieDetails.title || movieDetails.name;
  const date = movieDetails.release_date || movieDetails.first_air_date;
  const runtime = movieDetails.runtime || movieDetails.episode_run_time?.[0] || null;
  const rate = movieDetails.vote_average.toFixed(1);
  const fav = ()=> isFavorite(value.id)
  //----

  function formatRuntime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) return `${mins}m`;

    return `${hours}h ${mins}m`;
  }
console.log(movieDetails)
  return (
    <div className="backdrop-blur-md fixed top-0 bottom-0 right-0 left-0 z-50 overflow-y-auto"
      onClick={close}>

      <div onClick={close} className="fixed sm:top-[7%] top-[3%] right-[7%] cursor-pointer z-50">
        <CloseIcon className="text-muted" />
      </div>

      <div className="relative mx-auto mt-[2.5%] w-[90%] bg-card border-2 border-t-0 border-accent rounded-2xl flex flex-col items-center" onClick={e => e.stopPropagation()}>
        <div className="w-full h-60 bg-cover bg-contain bg-auto bg-center rounded-t-xl opacity-50 sticky"
          style={{ backgroundImage: `url(${backdrop})` }}></div>
        <div className="w-[90%]">
          <div className="flex justify-between">
            <div className="sm:w-35 w-25 sm:h-52 h-37 rounded-xl shadow-2xl bg-cover bg-contain bg-auto relative bottom-13 z-30"
              style={{ backgroundImage: `url(${poster})` }}
            ></div>
            <div className="lg:mr-30 sm:mr-15 ms:mr-5 mr-1 mt-5 sm:mb-0 mb-3 flex flex-col items-center">
              <h1 className="sm:text-3xl text-md">{title}</h1>
              <div className="flex gap-3 sm:m-3 m-1 sm:flex-row flex-col">
                {movieDetails.genres.map((genre) => (
                  <span key={genre.id} className="sm:py-1.5 sm:px-3 sm:text-md text-xs py-1 px-2 rounded-2xl border-accent border-2 transion sm:hover:scale-105">{genre.name}</span>
                ))}
              </div>
              {runtime !== null && (
                <div className="sm:text-md text-xs sm:my-0.5 my-1">run time: <span className="text-accent">{formatRuntime(runtime)}</span></div>
              )}
              <div className="sm:text-md text-xs sm:my-0.5 my-1">release date: {date}</div>
              <div className=" hidden sm:block" onClick={()=>toggleFavorite({ id: value.id, media_type: value.media_type })}>
                {fav() ? <FavoriteBut/>: <AddtofavBut/>}
              </div>
            </div>
          </div>
          <div className="">
            <p className="text-muted text-xs">{movieDetails.overview}</p>
          </div>
        <div className="py-3">{rate !== '0.0'? <span>rate: {rate}⭐</span> :null}</div>
        <div className="block sm:hidden" onClick={()=>toggleFavorite({ id: value.id, media_type: value.media_type })}>
                {fav() ? <FavoriteBut/>: <AddtofavBut/>}
              </div>
              <SideScroll>
                  {cast?.map((m: cast) => <CastCard key={m.id} data={m} />)}
              </SideScroll>
              <div className="mt-10">
                <SideScroll >
                {semelarMovies?.map((m: movie) => <Card key={m.id} data={m} />) }
              </SideScroll>
              </div>
        </div>

      </div>
    </div>
  )
}
