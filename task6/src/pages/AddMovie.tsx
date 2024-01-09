import { FunctionComponent } from "react";
import UpdateAndCreateMovie from "../UpdateAndCreateMovie/UpdateAndCreateMovie";
import { useMovieStore } from "../store/movieStore";
import { addAction } from "../../helpers/actions";
import { useNavigate } from "react-router-dom";
 
const AddMovie: FunctionComponent = () => {
    const { addMovie } = useMovieStore();
    const navigate = useNavigate();
    const add = async (formData: FormData) => {
        try {
            const addData = (await addAction(formData)).data
            addMovie(addData);
            navigate(`/movies/${addData.id}`)
        } catch (e) {
            console.error(e);
            navigate(`/`)
        }
    }

    return ( 
        <UpdateAndCreateMovie title="Добавление нового фильма" handler={add} />
    );
}
 
export default AddMovie;