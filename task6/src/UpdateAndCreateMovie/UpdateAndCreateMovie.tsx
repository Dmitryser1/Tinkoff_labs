import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListViewer from "../listViewer/ListViewer";
import { genresLoader } from "../../helpers/loaders";
import { MovieI } from "../../models/types";
import { replaceNoneImg } from "../../helpers/imageHelper";

interface UpdateAndCreateMovieProps {
    title: string,
    movie?: MovieI,
    handler: Function,
}
 
const UpdateAndCreateMovie: FunctionComponent<UpdateAndCreateMovieProps> = ({title, movie, handler} : UpdateAndCreateMovieProps) => {
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            setAllGenres(await genresLoader());
        }
        fetchData()
    }, [])

    const [selGenres, setSelGenres] = useState<string[]>(movie?.genres || []);
    const [allGenres, setAllGenres] = useState<string[]>([]);
    const [actor, setActor] = useState<string>('');
    const [actors, setActors] = useState<string[]>(movie?.actors?.split(',') || []);
    const [img, setImg] = useState<string>('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handler(new FormData(event.currentTarget))
      };
    
    return ( 
        <div className="flex grow">
            <div className="flex-shrink-0">
                <img
                    className=" w-96 h-[36rem] object-cover rounded-lg bg-slate-400 shadow-2xl mb-4"
                    key={movie?.posterUrl}
                    src={img || movie?.posterUrl || "/img/noneImg.jpg"}
                    alt="Картинка фильма"
                    onError={(e) => replaceNoneImg(e)}
                />
            </div>
            <div className="ml-10 grow">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <p className="text-3xl">{ title }</p>
                    <div className="flex">
                        <p className="text-slate-500 text-xl w-60">
                            Название:
                        </p>
                        <input className="input" name="title" type="text" defaultValue={movie?.title || ''} />
                    </div>
                    <div className="flex">
                        <p className="text-slate-500 text-xl w-60">
                            Постер:
                        </p>
                        <input className="input" name="posterUrl" type="text" defaultValue={movie?.posterUrl} onBlur={({target}) => setImg(target.value)} />
                    </div>
                    <div className="flex">
                        <p className="text-slate-500 text-xl w-60">
                            Режиссёр:
                        </p>
                        <input className="input" name="director" type="text" defaultValue={movie?.director || ''} />
                    </div>
                    <div className="flex">
                        <p className="text-slate-500 text-xl w-60">
                            Год:
                        </p>
                        <input className="input" name="year" type="text" defaultValue={movie?.year || ''} />
                    </div>
                    <div className="flex">
                        <p className="text-slate-500 text-xl w-60">
                            Длительность:
                        </p>
                        <input className="input" name="runtime" type="number" min={0} defaultValue={movie?.runtime || 0} />
                    </div>
                    <div className="flex">
                        <p className="text-slate-500 text-xl w-60">
                            Жанры:
                        </p>
                        <div className="relative w-full">
                            <input hidden name="genres" type="text" value={selGenres}/>
                            <ListViewer list={selGenres} setList={setSelGenres} />
                            <div className="z-10 peer-focus/tags:block rounded-lg hover:block top-full left-0 right-0 absolute w-full hidden shadow-xl">
                                <ul className="max-h-60 overflow-auto rounded-lg bg-white">
                                    {allGenres.map((genre, genreIdx) => 
                                        selGenres.find(x => x === genre) ? (
                                            <li
                                                key={genreIdx}
                                                className="cursor-pointer hover:bg-[#a1d9fa] p-1 px-3 bg-[#bfe7fd]"
                                                onClick={() => setSelGenres(selGenres.filter(x => x !== genre))}
                                            >
                                                {genre}
                                            </li>
                                        ) : (
                                            <li
                                                key={genreIdx}
                                                className="cursor-pointer hover:bg-[#a1d9fa] p-1 px-3"
                                                onClick={() => setSelGenres([...selGenres, genre])}
                                            >
                                                {genre}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <p className="text-slate-500 text-xl w-60">
                            Актёры:
                        </p>
                        <div className="relative w-full flex flex-col gap-4">
                            <div className="flex gap-4">
                                <input form="none" placeholder="Введите актера" className="input" name="actor" value={actor} onChange={({target}) => setActor(target.value)}/>
                                <button type="button" className="button" onClick={() => {setActors([...actors, actor]); setActor('')}}>Добавить</button>
                            </div>

                            <input hidden name="actors" type="text" value={actors}/>
                            <ListViewer list={actors} setList={setActors} />
                        </div>
                    </div>
                    <div className="flex">
                        <p className="text-slate-500 text-xl w-60">
                            Описание:
                        </p>
                        <textarea className="input h-40 max-h-64" name="plot" defaultValue={movie?.plot || ''}/>
                    </div>
                    
                    <div className="flex gap-4 justify-end">
                        <button type="button" className="del-button" onClick={() => {
                            navigate(-1);
                        }}>
                            Отмена
                        </button>
                        <button type="submit" className="button">
                            Сохранить
                        </button>
                    </div>
                </form>
                
                
            </div>
        </div>
    );
}
 
export default UpdateAndCreateMovie;