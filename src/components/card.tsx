import type { movie } from "../types/types"
import { useFavorites } from "../hooks/favoriteContext";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
 
 
export default function Card({ data }: { data: movie }) {
 
  if(data.media_type === undefined){data.media_type = 'movie'}
  const title = data.title || data.name
  const poster = "https://image.tmdb.org/t/p/w500" + data.poster_path
  const rate = data.vote_average.toFixed(1);
 
 
  const navigate = useNavigate()
 
  const { isFavorite, toggleFavorite } = useFavorites()
 
  return (
    
    <div
      className="flex flex-col items-center mx-5 mb-12 transition sm:hover:scale-110"
      id={String(data.id)}
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/details/${data.media_type}/${data.id}`)}}
    >
      {/* الصورة */}
      <div
        className="sm:w-33 w-22 aspect-2/3 rounded-xl shadow-2xl bg-cover bg-contain bg-auto z-30 bg-gray-500"
        style={{ backgroundImage: `url(${poster})` }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite({ id: String(data.id), media_type: data.media_type });
          }}
          className="m-1 w-fit"
        >
          {isFavorite(String(data.id)) ? <FavoriteIcon className="text-accent-red" /> : <FavoriteBorderIcon />}
        </div>
      </div>
 
      {/* المعلومات */}
      <div className="sm:w-37 w-28 sm:aspect-3/4 h-50 bg-card border-2 border-t-0 border-accent -mt-25 rounded-2xl">
        <div className="flex justify-center items-center gap-3 pt-30 w-full text-sm flex-col overflow-hidden">
          <div className="w-[90%] h-full flex flex-col items-center justify-center pb-3 sm:pb-5">
            <h1 className="sm:pb-2 p-1 pt-0 sm:text-sm text-[11px] line-clamp-2 card-title">{title}</h1>
            <div className="flex justify-between w-[80%] items-center sm:pb-3">
              <span className="sm:text-[15px] text-[10px]">
                {rate === '0.0' ? 'not yet' : ['⭐', rate]}
              </span>
              <span className="sm:text-[20px] text-[15px] curseve text-accent">{data.media_type}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}