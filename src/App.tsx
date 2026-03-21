import { BrowserRouter, Routes, Route } from "react-router-dom"

import { useOpen } from "./hooks/movieDetailsContext"

import Nav from "./components/nav"
import Home from "./pages/home"
import Favorites from "./pages/favorites"
import Discover from "./pages/discover"
import MovieDetails from "./components/movieDetails"
import NotFound from "./pages/notFound"
import Search from "./pages/search"


function App() {
  const { isOpend } = useOpen();
 

  return (
    <div className="text-text bg-bg">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route path="/" element={< Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={< NotFound/>} />

        </Routes>
      </BrowserRouter>
      {isOpend && <MovieDetails />}

    </div>
  )
}

export default App
