import { useEffect, useState } from "react"
import { getSeason } from "../API/SeasonDetailsAPI"
import type { episode } from "../types/types"
import type { season } from "../types/types"
import { Navigate, useParams, Link , useNavigate} from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MovieIcon from '@mui/icons-material/Movie';
import { usePhoto } from "../hooks/PhotoViewContext"
import PhotoView from "../components/PhotoView"


function SeasonDetails() {
     const { season_number, id, media_type } = useParams<{ season_number: string; id: string; media_type: "tv" | "movie"}>()
     const navigate = useNavigate()

    const [season, setSeason] = useState<season | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

if (media_type !== "tv" && media_type !== "movie") {
  return <Navigate to="/" /> // أو أي error handling
}
    useEffect(() => {
  const fetchSeason = async () => {
    try {
      const results: any = await getSeason(media_type, id!, season_number!);
      console.log(results);
      if (!results) throw new Error("Failed to fetch movie details");
      if (results.length === 0) throw new Error("Failed to fetch movie details");

      setSeason(results);
      setLoading(false);
      console.log(results);
    } catch (err) {
      setLoading(false);
      navigate("/not-found");
    }
  };

  fetchSeason();
}, [media_type, id, season_number, navigate]);



const {isOpend, open , setValue} = usePhoto();


const handelBackDrop = (post:string)=>{
    if(!isOpend){
      setValue({cover:"https://image.tmdb.org/t/p/w500" + post  , size:"sm:w-[80%] w-[90%]", aspect:"aspect-16/9"});
      open()
    }
  }
  return (
    <>
    {isOpend && <PhotoView/> }
    <div className="min-h-screen relative bg-bg flex flex-col justify-center overflow-hidden box-border px-5 overflow-x-hidden">

    

      <div className="w-full flex justify-center mt-11 z-50 absolute top-1 sm:pr-15 pr-10">
          <div className="w-[90%] flex justify-between items-center">
            <div className="flex items-center">
            <Link to= {"/"}><HomeIcon sx={{width:{sm: "40px", xs: "18px"
                        }}} className="sm:text-4xl text:sm text-text cursor-pointer z-80  " /> </Link>
            <MovieIcon sx={{width:{sm: "40px", xs: "18px"
                        }}} className="sm:text-4xl text:sm text-text cursor-pointer absolute z-80 sm:ml-17 ml-10" onClick={()=>navigate(`/details/${media_type}/${id}`)} />
        </div>
                    
                        <ArrowBackIcon sx={{width:{sm: "40px", xs: "20px"
                        }}} className="sm:text-4xl text:xs text-text cursor-pointer z-80" onClick={()=>navigate(-1)} /></div> 

        </div>
                    
      <div className="flex flex-col items-center mt-25 sm:px-10 px-4 ">
        {loading &&  <img src={"/favoflicks_star.svg"} alt="loading suv" className="suv-around w-5 mx-2" />
        }
        <h2 className="sm:text-3xl text-xl "> {season?.name}</h2>
        <h4 className="mt-2 mb-5 text sm:text-sm text-xs text-muted">{season?.air_date}</h4>
        <p className="font-serif sm:text-sm text-xs">{season?.overview}</p>
      </div>
      <div className="flex flex-col items-center mt-20 gap-5">
        {season?.episodes.map((episode: episode) => (
            
          <div key={episode.id} className="flex sm:flex-row flex-col items-center sm:my-3 my-5 sm:justify-between w-[60%]">
            <div className="flex flex-col items-center gap-2">
                <div className="cursor-pointer sm:w-50 w-32 aspect-16/9 rounded-xl shadow-2xl bg-cover bg-contain bg-auto z-30 bg-gray-500"
              onClick={()=>handelBackDrop(episode.still_path)}
              style={{ backgroundImage: `url(${episode.still_path ? "https://image.tmdb.org/t/p/w500" + episode.still_path : "https://via.placeholder.com/500x281?text=No+Image"})` }}
            />
            <div className="py-3">{episode.vote_average !== 0.0 ? <span>{episode.vote_average.toFixed(1)}⭐</span> : null}</div>

            </div>
            <div className="flex flex-col items-center">
              <h3 className="sm:text-lg text-md">{episode.episode_number}. {episode.name}</h3>
              <p className="sm:text-sm text-xs text-muted">{episode.air_date}</p>
               {episode.episode_run_time !== undefined && episode.episode_run_time !== null && (
                <p className="font-serif sm:text-sm text-xs text-muted">
                  <span className="text-accent">{episode.episode_run_time}</span> min
                </p>
              )}
            </div>
          </div>
        ))}

      </div>
    </div>
    </>
  )
}

export default SeasonDetails
