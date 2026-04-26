import axios from "axios";

//from the .env
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;


export const getDetails = async (type: string | 'tv', id:string) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
      },
    });

    return response.data; // Array of works
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const getCast = async (type: string | 'tv', id:string) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
      },
    });

    return response.data.cast; // Array of works
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const getSemMovies = async (type: string | 'tv', id:string) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/similar`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
      },
    });

    return response.data.results; // Array of works
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const getTrailer = async (type: string | 'tv', id:string) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
      },
    });

    return response.data.results; // Array of works
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

