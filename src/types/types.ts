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
    
}

export type cast ={
    id:number
    name:string
    character:string
    profile_path:string

}

