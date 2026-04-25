import HomeIcon from '@mui/icons-material/Home';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { NavLink } from 'react-router-dom';

function BottomNav() {
  return (
    <div className="w-full h-14 bg-card rounded-t-2xl flex box-border justify-between items-center px-10 fixed -bottom-2 opacity-95 z-200 sm:hidden">
      <NavLink to={'/'}>
      {({ isActive }) => (

        <HomeIcon className={`${isActive ? 'text-accent' : 'text-text'}`}/>
      )}
      </NavLink>
      <NavLink to={'/discover'}>
      {({ isActive }) => (

        <LocalMoviesIcon className={`${isActive ? 'text-accent' : 'text-text'}`}/>
      )}
      </NavLink>
      <NavLink to={'/search'}>
      {({ isActive }) => (

        <SearchIcon className={`${isActive ? 'text-accent' : 'text-text'}`}/>
      )}
      </NavLink>
      <NavLink to={'/favorites'}>
      {({ isActive }) => (

        <FavoriteIcon className={`${isActive ? 'text-accent' : 'text-text'}`}/>
      )}
      </NavLink>
    </div>
  )
}

export default BottomNav
