import { FunctionComponent } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MovieI } from "../../models/types";
import UpdateAndCreateMovie from "../UpdateAndCreateMovie/UpdateAndCreateMovie";
import { useMovieStore } from "../store/movieStore";
import { editAction } from "../../helpers/actions";
 
const EditMovie: FunctionComponent = () => {
    const movie: MovieI = (useLoaderData() as MovieI);
    const navigate = useNavigate();
    const { updMovie } = useMovieStore();

    const editMovie = async (formData: FormData) => {
        try {
            const editData = (await editAction(formData, movie.id)).data
            updMovie(editData);
        } catch (e) {
            console.error(e);
        } finally {
            navigate(`/movies/${movie.id}`)
        }
    }

    return ( 
        <UpdateAndCreateMovie movie={movie} title="Редактирование информации о фильме" handler={editMovie} />
    );
}
 
export default EditMovie;