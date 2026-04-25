import { useEffect, useState } from "react"
import { getSeason } from "../API/SeasonDetailsAPI"
import type { episode } from "../types/types"
import type { season } from "../types/types"
import { Navigate, useParams, Link , useNavigate} from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MovieIcon from '@mui/icons-material/Movie';
function SeasonDetails() {
     const { season_number, id, media_type } = useParams<{ season_number: string; id: string; media_type: "tv" | "movie"}>()
     const navigate = useNavigate()

    const [season, setSeason] = useState<season | null>(null)

if (media_type !== "tv" && media_type !== "movie") {
  return <Navigate to="/" /> // أو أي error handling
}
    useEffect(() => {
        const fatch =async() => {
           const results:any = await getSeason(media_type, id!, season_number!)
           setSeason(results)
           console.log(results)
        
        }
 fatch()
    }, [])
  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center overflow-hidden box-border px-5 overflow-x-hidden">
        <div className="w-full flex justify-center mt-11 z-50 ">
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
                    
      <div className="flex flex-col items-center mt-9 sm:px-10 px-4 ">
        <h2 className="sm:text-3xl text-xl "> {season?.name}</h2>
        <h4 className="mt-2 mb-5 text sm:text-sm text-xs text-muted">{season?.air_date}</h4>
        <p className="font-serif sm:text-sm text-xs">{season?.overview}</p>
      </div>
      <div className="flex flex-col items-center mt-20 gap-5">
        {season?.episodes.map((episode: episode) => (
            
          <div key={episode.id} className="flex sm:flex-row flex-col items-center sm:my-3 my-5 sm:justify-between w-[60%]">
            <div className="flex flex-col items-center gap-2">
                <div className="sm:w-50 w-32 aspect-16/9 rounded-xl shadow-2xl bg-cover bg-contain bg-auto z-30 bg-gray-500"
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
  )
}

export default SeasonDetails
