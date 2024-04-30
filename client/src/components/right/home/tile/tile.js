import "./tile.scss"
import { useNavigate } from 'react-router-dom';
export default function Tile({ data }) {
    let navigate = useNavigate();
    function hitPlaylist() {
        navigate(`/playlist/tile/spotify/${data.name}`);
    }
    return (
        <div id="tile" onClick={hitPlaylist}>
            <img src={data.img} alt="" />
            <p>{data?.name}</p>
        </div>
    )
}
