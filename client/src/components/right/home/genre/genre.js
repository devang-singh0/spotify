import "./genre.scss"
import { useNavigate } from 'react-router-dom';

export default function Genre({ data }) {
    let navigate = useNavigate();
    function genre() {
        navigate(`/playlist/genre/spotify/${data.name}`);
    }
    return (
        <div id="genre" onClick={genre}>
            <p>{data.name}</p>
            <img src="https://picsum.photos/id/237/200/200" alt="" />
        </div>
    )
}