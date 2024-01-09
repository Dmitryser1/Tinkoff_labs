import { FunctionComponent } from "react";
import { NavLink, useRouteLoaderData } from "react-router-dom";
import { FavoriteI, MovieI } from "../../models/types";

interface IndexPageProps {
    
}
 
const IndexPage: FunctionComponent<IndexPageProps> = () => {
    // const { movies }: { movies: MovieI[], favorites: FavoriteI[] } = (useRouteLoaderData("root") as { movies: MovieI[], favorites: FavoriteI[] });
    // console.log("movies", movies);
    
    return (
        <div className="flex flex-col grow justify-center items-center">
            <img src="/img/favicon.ico" alt="Иконка" />
            <div>
                <p className=" text-7xl font-bold text-[#301014]">ФИЛЬМОТЕКА</p>
            </div>
            <div>
                <p className=" text-3xl text-slate-500 ">для лабораторной работы</p>
            </div>
            {/* <div className="mt-20">
                <NavLink to={`/movies/${ movies[Math.floor(Math.random()*movies.length)].id }`} className="button">Cлучайный фильм</NavLink>
            </div> */}
        </div>
    );
}
 
export default IndexPage;