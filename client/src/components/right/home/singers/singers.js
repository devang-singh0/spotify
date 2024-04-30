import "./singers.scss"
import { useNavigate } from 'react-router-dom';

export default function Singers({data}){
    let navigate = useNavigate();
    function callPlaylist() {
        navigate(`/playlist/singer/spotify/${data.singer}`);
    }
    return(
        <div id="singers" onClick={callPlaylist}>
            <img src="https://picsum.photos/id/237/200/200" alt="" />
            <p>{data.singer}</p>
            <h4>{data.song} songs</h4>
        </div>
    )
}