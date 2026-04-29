export type movie = {
    id: number
    poster_path: string
    vote_average: number

    title?: string
    name?: string

    release_date?: string
    first_air_date?: string

    media_type: "movie" | "tv"
    adult:boolean
}

type production_companies = {
    name: string;
    id: number;
    logo_path: string | null;
}

export type movieDetails ={
    id: number
    poster_path: string
    backdrop_path:string
    vote_average: number

    title?: string
    name?: string

    release_date?: string
    first_air_date?: string

    runtime: number
    episode_run_time:number[]

    media_type: "movie" | "tv"
    adult:boolean
    genres: { id: number; name: string }[] 
    overview: string
    seasons: seasons[]
    production_companies: production_companies[]
    
}

export type cast ={
    id:number
    name:string
    character:string
    profile_path:string

}
export type seasons = {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
}

export type season ={
    name: string;
    air_date: string;
    episodes: episode[];
    id: number;
    vote_average: number;
    poster_path: string;
    overview: string;
    season_number: number;
}

export type episode = {
    air_date: string;
    episode_number: number;
    episode_run_time: number;
    episode_type: string;
    id: number;
    vote_average: number;
    name: string;
    still_path: string;
    overview: string;
}

