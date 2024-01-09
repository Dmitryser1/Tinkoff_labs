import axios from "axios";

export async function moviesLoader(q?:string) {
    const movies = await axios.get('http://localhost:3000/movies', { params: { q } })
    return movies.data;
}

export async function movieLoader({ params }: any) {
    const movie = await axios.get(`http://localhost:3000/movies/${ params.movieId }`);
    return movie.data;
}

export async function genresLoader() {
    const genres = await axios.get(`http://localhost:3000/genres`);
    return genres.data;
}

export async function favoritesLoader() {
    const favorites = await axios.get(`http://localhost:3000/favorites`);
    return favorites.data;
}