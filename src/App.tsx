import { Routes, Route } from "react-router-dom"
import { useMatch } from "react-router-dom"

import Nav from "./components/nav"
import Home from "./pages/home"
import Favorites from "./pages/favorites"
import Discover from "./pages/discover"
import NotFound from "./pages/notFound"
import Search from "./pages/search"
import ShowDetails from "./pages/showDetails"
import FoundError from "./pages/FoundError"
import BottomNav from "./components/BottomNav"
import SeasonDetails from "./pages/SeasonDetails"
import ActorDetails from "./pages/ActorDetails"


function App() {
  const matchDetails = useMatch("/details/:media_type/:id")
  const matchSeasonDetails = useMatch("/details/:media_type/:id/season/:season_number")
  const hideNav = !!matchDetails || !!matchSeasonDetails



  return (
    <div className="text-text bg-bg w-full overflow-x-hidden">
      {!hideNav&& <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/details/:media_type/:id" element={<ShowDetails />} />
        <Route path="/details/:media_type/:id/season/:season_number" element={<SeasonDetails />} />
        <Route path= "actor/:id" element={<ActorDetails />} />
        <Route path="/not-found" element={<FoundError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideNav && <BottomNav />}
    </div>
  )
}

export default App
