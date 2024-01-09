import { FunctionComponent } from "react";
import { MovieI } from "../../models/types";
import { replaceNoneImg } from "../../helpers/imageHelper";
import { Form, NavLink } from "react-router-dom";

interface MovieMenuItemProps {
    movie?: MovieI
    isFavorite? : boolean
    changeFavorite?: Function
}
 
const MovieMenuItem: FunctionComponent<MovieMenuItemProps> = ({ movie, isFavorite = false, changeFavorite } : MovieMenuItemProps) => {

    return ( 
        <div className="relative">
            <NavLink to={movie ? `movies/${movie.id}` : ''} className={({ isActive, isPending }) => `flex rounded-2xl h-32 mt-10 border-t-[#e6f9ff] border-t-2 transition-all
                ${isActive
                    ? "bg-[#a1d9fa]"
                    : isPending
                    ? "bg-[#88c2e4]"
                    : "bg-[#e6eaee]"}`
                }>
                <div className="w-32 relative flex-shrink-0">
                    <div className=" left-4 right-4 bottom-4 -top-10 absolute flex rounded-lg bg-white shadow-xl">
                        { movie ? (
                            <img className=" object-cover rounded-lg bg-slate-400" key={movie.posterUrl} src={movie.posterUrl || "/img/noneImg.jpg"} alt="Картинка фильма" onError={(e) => replaceNoneImg(e)}/>
                        ) : (
                            <div className=" animate-pulse rounded-lg bg-slate-400 w-full h-full"></div>
                        )}
                    </div>
                </div>
                <div className="p-4 pl-0 min-w-0 grow">
                    { movie ? (
                        <>
                            <h1 className="grow text-xl font-bold truncate">{ movie.title || "Нет названия" }</h1>
                            <h1 className=" text-slate-500 truncate">{ movie.year || "Год отсутствует" }</h1>
                            <h1 className=" text-slate-500 truncate">{ Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres || "" }</h1>
                        </>
                    ) : (
                        <div className=" animate-pulse "></div>
                    )}
                </div>
            </NavLink>
            { movie && (isFavorite ? (
                        <button className="w-8 h-8 left-28 -top-10 absolute flex justify-center items-center" onClick={() => changeFavorite && changeFavorite(true, movie)}>
                            <img className="w-6 h-6" src="/img/star_fill.svg" />
                        </button>
                    ):(
                        <button className="w-8 h-8 left-28 -top-10 absolute flex justify-center items-center" onClick={() => changeFavorite && changeFavorite(false, movie)}>
                            <img className="w-5 h-5" src="/img/star_empty.svg" />
                        </button>
                    ))}
        </div>
     );
}
 
export default MovieMenuItem;