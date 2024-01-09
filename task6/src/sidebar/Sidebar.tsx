import { FunctionComponent, useEffect, useState } from "react";
import MovieMenuItem from "./MovieMenuItem";
import axios from "axios";
import { FavoriteI, MovieI } from "../../models/types";
import { Form, NavLink, useLoaderData } from "react-router-dom";
import { useMovieStore } from '../store/movieStore.ts';
import { useFavoriteStore } from "../store/favoriteStore.ts";
import { delFavorite, saveFavorite } from "../../helpers/actions.ts";
import { moviesLoader } from "../../helpers/loaders.ts";

interface sidebarProps {
    
}
 
const Sidebar: FunctionComponent<sidebarProps> = () => {
  // const { movies, favorites }: { movies: MovieI[], favorites: FavoriteI[] } = (useLoaderData() as { movies: MovieI[], favorites: FavoriteI[] });
  const { movies, setMovies } = useMovieStore();
  const { favorites, removeFavorite, addFavorite } = useFavoriteStore();
    // const [movies, setMovies] = useState<MovieI[]>(fetchMovies)
    const [search, setSearch] = useState<string>("")
    const [isLoading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        fetchData()
    }, [])
    

    const fetchData = async (q?:string) => {
      try {
        setLoading(true);
        setMovies(await moviesLoader(q));
      } catch (e) {
          console.error(e);
      } finally {
        setLoading(false);
      }
    }


    const changeFavorite = async (isFavorite: boolean, movie: MovieI) => {
      try {
          if (isFavorite) {
              const favorite = favorites.find((x) => x.movieId == movie.id)
              if (favorite) {
                  await delFavorite(favorite)
                  removeFavorite(favorite)
              }
          } else {
              addFavorite(await saveFavorite(movie.id))
          }
      } catch (e) {
          console.error(e);
      }
    }

    return ( 
        <>
        <div id="sidebar" className=" bg-[#f3f7fa] w-[500px] flex flex-col h-screen sticky top-0 pt-16 shadow-lg flex-shrink-0">
          <div className=" p-4">
            <div className="flex gap-4 justify-between items-center">
              <input
                id="q"
                placeholder="Поиск фильма"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search input"
                name="q"
              />
              <div>
                <button className="button" onClick={() => fetchData(search)}>Найти</button>
              </div>
            </div>
          </div>

        {/* <div className="px-4 text-2xl border-t border-t-solid border-t-black">Список фильмов:</div> */}
        <nav className="flex-grow min-h-0">
            <ul className="flex flex-col h-full gap-2 overflow-x-auto px-4">
              {isLoading ? (
                <>
                <MovieMenuItem />
                <MovieMenuItem />
                <MovieMenuItem />
                <MovieMenuItem />
                <MovieMenuItem />
                <MovieMenuItem />
                <MovieMenuItem />
                <MovieMenuItem />
            </>
              ):(
                movies && movies.length ? 
                    movies.map(movie => (
                        <li key={movie.id} >
                            <MovieMenuItem movie={ movie } isFavorite={!!favorites.find(x => x.movieId == movie.id)} changeFavorite={changeFavorite} />
                        </li>
                    )) : (
                        <>
                            <p>Фильмы не найдены</p>
                        </>
                    )
              )}
            </ul>
        </nav>
        <div className=" border-t border-t-solid flex justify-between items-center px-4 py-4">
          <div>
              Найдено <span className="font-bold">{ movies?.length || 0 }</span> элементов
          </div>
          <div>
              <NavLink to='/movies/add' className="button">
                  Добавить
              </NavLink>
          </div>
        </div>
        </div>
        </>
    );
}
 
export default Sidebar;