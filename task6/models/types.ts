export interface MovieI {
    id: number,
    title: string,
    year: string,
    runtime: number,
    genres: string[],
    director: string,
    actors: string,
    plot: string,
    posterUrl: string
}

export interface FavoriteI {
    id: number,
    movieId: number
}