import { create } from 'zustand'
import { MovieI } from '../../models/types';

interface MovieState {
    movies: MovieI[];
    setMovies: (movies: MovieI[]) => void;
    removeMovie: (movie: MovieI) => void;
    addMovie: (movie: MovieI) => void;
    updMovie: (movie: MovieI) => void;
  }

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  setMovies: (movies: MovieI[]) => set((state) => ({ movies: movies })),
  removeMovie: (movie: MovieI) => set((state) => ({ movies: state.movies.filter(x => x.id !== movie.id) })),
  addMovie: (movie: MovieI) => set((state) => ({ movies: [...state.movies, movie] })),
  updMovie: (movie: MovieI) => set((state) => ({ movies: state.movies.map(x => x.id === movie.id ? movie: x ) })),
}))