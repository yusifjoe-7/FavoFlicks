import axios from "axios";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;


export const getDiscover = async (gener:number) => {
  try {
    const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        language: "en-US",
        with_genres: gener,
      },
    });

    return response.data.results; // Array of works
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};