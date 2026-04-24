import { Routes, Route } from "react-router-dom"
import { useMatch } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useScreenSize } from "./hooks/screenSizeHook"

import Nav from "./components/nav"
import Home from "./pages/home"
import Favorites from "./pages/favorites"
import Discover from "./pages/discover"
import NotFound from "./pages/notFound"
import Search from "./pages/search"
import ShowDetails from "./pages/showDetails"
import FoundError from "./pages/FoundError"
import BottomNav from "./components/BottomNav"

function App() {
  const matchDetails = useMatch("/details/:media_type/:id")
  const location = useLocation();
  const hideNav = !!matchDetails 
  const width = useScreenSize();
  

  const isApp:boolean = location.pathname.startsWith("/app");
  const isMobile = width <= 768;


  return (
    <div className="text-text bg-bg w-full overflow-x-hidden">
      {!hideNav && (!isApp || !isMobile) && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/details/:media_type/:id" element={<ShowDetails />} />
        <Route path="/not-found" element={<FoundError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideNav && isApp && isMobile && <BottomNav />}
    </div>
  )
}

export default App
