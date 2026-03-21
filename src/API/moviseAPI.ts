import axios from "axios";

//from the .env
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

// the fr function for the main page

export const getPopularMovies = async (page:number) => {
  try {
    const response = await axios.get("https://api.themoviedb.org/3/trending/all/week", {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        language: "en-US",
        page: page ,// to get multe pages
      },
    });

    return response.data.results; // Array of works
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

