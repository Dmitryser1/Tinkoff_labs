import {
  Form,
  NavLink,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import { replaceNoneImg } from "../../helpers/imageHelper";
import { FavoriteI, MovieI } from "../../models/types";
import { useEffect, useState } from "react";
import { useFavoriteStore } from "../store/favoriteStore";
import { saveFavorite, delFavorite } from "../../helpers/actions";

export interface MovieProps {
  id: number;
  title: string;
  year: string;
  runtime: number;
  genres: string[];
  director: string;
  actors: string;
  plot: string;
  posterUrl: string;
}

const Movie = () => {
  // const { favorites }: { movies: MovieI[], favorites: FavoriteI[] } = (useRouteLoaderData("root") as { movies: MovieI[], favorites: FavoriteI[] });
  const { favorites, removeFavorite, addFavorite } = useFavoriteStore();
  const movie: MovieI = useLoaderData() as MovieI;
  const [isGenreOpen, setGenreOpen] = useState(false);
  const [isActorOpen, setActorOpen] = useState(false);

  const changeFavorite = async (isFavorite: boolean) => {
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
    <div className="flex grow">
      <div className="flex-shrink-0 ">
        <img
          className=" w-96 h-[36rem] object-cover rounded-lg bg-slate-400 shadow-2xl mb-4"
          key={movie.posterUrl}
          src={movie.posterUrl || "/img/noneImg.jpg"}
          alt="Картинка фильма"
          onError={(e) => replaceNoneImg(e)}
        />
        <div className="flex items-center gap-2 justify-between">
          <NavLink to={"edit"} className="button flex items-center gap-2">
            <div className="pl-2">
              <img className="w-5 h-5" src="/img/edit.svg" alt="" />
            </div>
            <p className="pr-5">Редактировать</p>
          </NavLink>

          <Form method="post" action="destroy">
            <button type="submit" className="del-button">
              <img className="w-5 h-5" src="/img/trash.svg" alt="" />
            </button>
          </Form>
        </div>
      </div>
      <div className="ml-10 grow">
        <div className="flex justify-between grow">
          <h1 className=" text-6xl font-bold mb-10">
            {movie.title || "Нет названия"}
          </h1>
          {favorites.find((x) => x.movieId == movie.id) ? (
            <button className="flex justify-center items-center" onClick={() => changeFavorite(true)}>
              <img className="w-14 h-14" src="/img/star_fill.svg" />
            </button>
          ) : (
            <button className="flex justify-center items-center" onClick={() => changeFavorite(false)}>
              <img className="w-14 h-14" src="/img/star_empty.svg" />
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-10">
          <p className="text-3xl">О фильме</p>

          <div className="flex">
            <p className="text-slate-500 text-xl w-60">Режиссёр:</p>
            <p className="text-slate-500 text-xl">
              {movie.director || "Нет имени"}
            </p>
          </div>
          <div className="flex">
            <p className="text-slate-500 text-xl w-60">Год производства:</p>
            <p className="text-slate-500 text-xl">{movie.year || "Нет года"}</p>
          </div>
          <div className="flex">
            <p className="text-slate-500 text-xl w-60">Длительность:</p>
            <p className="text-slate-500 text-xl">
              {movie.runtime
                ? `${Math.floor(movie.runtime / 60)}ч ${Math.floor(
                    movie.runtime % 60
                  )}м`
                : "0"}
            </p>
          </div>
          <div className="flex">
            <p className="text-slate-500 text-xl w-60">Жанры:</p>
            <p className="text-slate-500 text-xl">
              {(Array.isArray(movie.genres) ? movie.genres : [movie.genres])
                .slice(0, isGenreOpen ? movie.genres.length : 4)
                .map((genre, i) => (
                  <p
                    key={`${i}-${genre}`}
                    className="text-slate-500 text-xl w-60"
                  >
                    {genre}
                  </p>
                ))}
              {movie.genres.length > 4 && (
                <p
                  className="text-[#5ea9ff] cursor-pointer"
                  onClick={() => setGenreOpen(!isGenreOpen)}
                >
                  {isGenreOpen
                    ? "спрятать"
                    : `показать еще ${movie.genres.length - 4}`}
                </p>
              )}
            </p>
          </div>
          <div className="flex">
            <p className="text-slate-500 text-xl w-60">Актёры:</p>
            <p className="text-slate-500 text-xl flex flex-col">
              {movie?.actors
                ?.split(",")
                .slice(0, isActorOpen ? movie?.actors?.split(",").length : 4)
                .map((actor, i) => (
                  <p
                    key={`${i}-${actor}`}
                    className="text-slate-500 text-xl w-60"
                  >
                    {actor}
                  </p>
                )) || "Нет актёров"}
              {movie?.actors?.split(",").length > 4 && (
                <p
                  className="text-[#5ea9ff] cursor-pointer"
                  onClick={() => setActorOpen(!isActorOpen)}
                >
                  {isActorOpen
                    ? "спрятать"
                    : `показать еще ${movie?.actors?.split(",").length - 4}`}
                </p>
              )}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-3xl">Описание</p>

          <p className="text-slate-500 text-xl">
            {movie.plot || "Нет описания"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
