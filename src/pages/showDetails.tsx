import { useState, useEffect } from "react";
import type { movieDetails,cast, movie } from "../types/types";
import { getDetails,getCast, getSemMovies } from "../API/moviesDetailsAPI";
import {Navigate, useNavigate, useParams } from "react-router-dom";
import { useFavorites } from "../hooks/favoriteContext";
import { Link } from "react-router-dom";
import FavoriteBut from "../components/favoriteBut";
import AddtofavBut from "../components/addtofavBut";
import SideScroll from "../components/sideScroll";
import CastCard from "../components/castCard";
import Card from "../components/card";
import LoadingPage from "./LoadingPage";

 import HomeIcon from '@mui/icons-material/Home';
 import ArrowBackIcon from '@mui/icons-material/ArrowBack';




export default function ShowDetails() {


    const [movieDetails, setMovieDetails] = useState<movieDetails>()
  const [cast, setCast] = useState<cast[]>([])
  const [semelarMovies, setSemelarMovies] = useState<movie[]>([])
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false);

  // ✅ كل الـ hooks فوق أي return
  const { id, media_type } = useParams<{ id: string; media_type: "tv" | "movie" }>()
  const { isFavorite, toggleFavorite } = useFavorites()
  const navigate = useNavigate()

 useEffect(() => {
  if (!id || !media_type) return;

  window.scrollTo(0, 0);
  setLoading(true)
    setMovieDetails(undefined); // ✅ امسح الداتا القديمة
  setCast([]);
  setSemelarMovies([]);


  const fetchMovies = async () => {
    try {
      const [movies, castData, sim] = await Promise.all([
        getDetails(media_type, id),
        getCast(media_type, id),
        getSemMovies(media_type, id),
      ]);
      if (!movies) throw new Error("Failed to fetch movie details");

      setMovieDetails(movies);
      setCast(castData);
      setSemelarMovies(sim);
      setLoading(false);
    } catch (err) {
      console.error(err);
  setHasError(true);
  setLoading(false);
  navigate("/not-found");
    }
  };

  fetchMovies();
}, [id, media_type]);

  // ✅ كل الـ returns بعد الـ hooks
if (loading) return <LoadingPage />
if (hasError) return <Navigate to="/not-found" replace />

if (!id || !media_type) return <div>not found</div>
if (!movieDetails) return null

  const backdrop = "https://image.tmdb.org/t/p/w500" + movieDetails.backdrop_path
  const poster = "https://image.tmdb.org/t/p/w500" + movieDetails.poster_path
  const title = movieDetails.title || movieDetails.name
  const date = movieDetails.release_date || movieDetails.first_air_date
  const runtime = movieDetails.runtime || movieDetails.episode_run_time?.[0] || null
  const rate = movieDetails.vote_average.toFixed(1)
  const fav = () => isFavorite(id)

  function formatRuntime(minutes: number) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours === 0) return `${mins}m`
    return `${hours}h ${mins}m`
  }

  return (
    

     

      <div className=" w-full bg-bg  flex flex-col items-center">

             <Link to= {"/"}><HomeIcon className="text-4xl text-text cursor-pointer absolute top-[3%] left-[5%] z-80" /> </Link>
            <ArrowBackIcon className="text-4xl text-text cursor-pointer absolute top-[3%] right-[5%] z-80" onClick={()=>navigate(-1)} /> 
         
        <div className="w-full h-60 bg-cover bg-contain bg-auto bg-center opacity-50 sticky"
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
                  <span key={genre.id} className="sm:py-1.5 sm:px-3 sm:text-md text-xs py-1 px-2 rounded-2xl border-accent border-2  sm:hover:scale-105 transition cursor-default"><div className="">{genre.name}</div></span>
                ))}
              </div>
              {runtime !== null && (
                <div className="sm:text-md text-xs sm:my-0.5 my-1">run time: <span className="text-accent">{formatRuntime(runtime)}</span></div>
              )}
              <div className="sm:text-md text-xs sm:my-0.5 my-1">release date: {date}</div>
              <div className=" hidden sm:block" onClick={()=>toggleFavorite({ id: id, media_type: media_type })}>
                {fav() ? <FavoriteBut/>: <AddtofavBut/>}
              </div>
            </div>
          </div>
          <div className="">
            <p className="text-muted text-xs">{movieDetails.overview}</p>
          </div>
        <div className="py-3">{rate !== '0.0'? <span>rate: {rate}⭐</span> :null}</div>
        <div className="block sm:hidden" onClick={()=>toggleFavorite({ id: id, media_type:media_type })}>
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
    
  )
}
