import { create } from 'zustand'
import { FavoriteI, MovieI } from '../../models/types';

interface FavoriteState {
    favorites: FavoriteI[];
    setFavorites: (favorites: FavoriteI[]) => void;
    removeFavorite: (favorite: FavoriteI) => void;
    addFavorite: (favorite: FavoriteI) => void;
  }

export const useFavoriteStore = create<FavoriteState>((set) => ({
  favorites: [],
  setFavorites: (favorites: FavoriteI[]) => set((state) => ({ favorites: favorites })),
  removeFavorite: (favorite: FavoriteI) => set((state) => ({ favorites: state.favorites.filter(x => x.id !== favorite.id) })),
  addFavorite: (favorite: FavoriteI) => set((state) => ({ favorites: [...state.favorites, favorite] }))
}))