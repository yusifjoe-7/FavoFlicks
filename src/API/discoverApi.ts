import axios from "axios";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const getTrendingDay = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/all/day`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        language: "en-US",
        
      },
    });

    return response.data.results; // Array of works
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};


export const getDiscover = async (media_type:string) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/${media_type}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        language: "en-US",
        
      },
    });

    return response.data.results; // Array of works
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const getTopRated = async (media_type:string) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/${media_type}/top_rated`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        language: "en-US",
      },
    });

    return response.data.results; // Array of works
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};