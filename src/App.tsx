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

function App() {
  const matchDetails = useMatch("/details/:media_type/:id")
  const hideNav = !!matchDetails 

  return (
    <div className="text-text bg-bg">
      {!hideNav && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<Search />} />
        <Route path="/details/:media_type/:id" element={<ShowDetails />} />
        <Route path="/not-found" element={<FoundError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
