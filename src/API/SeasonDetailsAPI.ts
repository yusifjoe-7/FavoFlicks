import axios from "axios";


//from the .env
const TOKEN = import.meta.env.VITE_TMDB_TOKEN


export const getSeason = async (type: string | 'tv', id:string, season_number:string) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/season/${season_number}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
      },
    });

    

    return response.data; 
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    
    return [];
  }
};