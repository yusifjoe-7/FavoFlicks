import SideScroll from './sideScroll';
import type { seasons } from '../types/types';
import { Link  } from 'react-router-dom';


type props ={
    seasons: seasons[],
    id:string,
    media_type: "tv" | "movie"
}


const posterMainn = "https://image.tmdb.org/t/p/w500"
const Seasons = ( { seasons, id, media_type }: props ) => {

    

  return (
    <div className='mb-7 mt-3 w-full flex flex-wrap'>
        <SideScroll>
      {seasons.map((season) => (
        <Link to={`/details/${media_type}/${id}/season/${season.season_number}`} key={season.id}>
       <div className="sm:mx-10 mx-5 my-3 items-center flex flex-col">
        <div
        className="sm:w-33 w-22 aspect-2/3 rounded-xl shadow-2xl bg-cover bg-contain bg-auto z-30 bg-gray-500 sm:hover:scale-105 sm:hover:border border-accent transition cursor-pointer"
        style={{ backgroundImage: `url(${posterMainn + season.poster_path})` }}
      />
      <span className='text-text block mt-4 sm:text-md text-sm'>{season.name}</span>
      <span className='text-xs text-muted'>{season.air_date}</span>
      <div className="pt-2 sm:text-sm text-xs curseve ">{season.vote_average !== 0.0? <span>{season.vote_average}⭐</span> :null}</div>
       </div>
</Link>
      )
      )}
      </SideScroll>
    </div>
  );
};

export default Seasons;