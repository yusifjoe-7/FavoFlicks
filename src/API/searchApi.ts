import axios from "axios";

//from the .env
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

type MultiSearchResult = {
  media_type: "movie" | "tv" | "person";
  [key: string]: any;
};
export const getSearch = async (searchValue:string) => {
  try {
    const response = await axios.get("https://api.themoviedb.org/3/search/multi", {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        language: "en-US",
        query: searchValue,
        page: 1 ,
      },
    });   
    const finalResults = response.data.results.filter(
    (item:MultiSearchResult) => item.media_type !== "person"
  );

    return finalResults; // Array of works
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};