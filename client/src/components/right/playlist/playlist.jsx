import './playlist.scss'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react';
import SongContext from '../../../context/SongContext';
export default function Playlist() {
    let [playlistInfo, setplaylistInfo] = useState();
    const { type, name, playlist } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/playlist/${type}/${name}/${playlist}`, {
            withCredentials: true
        })
            .then(function (response) {
                setplaylistInfo(response.data);
            }).catch(err => console.log(err))
    }, [])
    return (
        <>
            <div id="songsPage">
                {/* --------------------- */}
                <div className="upper">
                    <img src="https://picsum.photos/id/237/200/200" alt="" />
                    <div className="info">
                        <p>{playlistInfo?.type}</p>
                        <h4>{playlistInfo?.name}</h4>
                        <h3>{playlistInfo?.user} • <span>{playlistInfo?.number} songs</span></h3>
                    </div>
                </div>
                {playlistInfo && playlistInfo.data && playlistInfo.data.length > 0 && (
                    <div className="table">
                        <div className="tableHead">
                            <p>#</p>
                            <p>Title</p>
                            <p>Album</p>
                            <p>Genre</p>
                            <p></p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="16" width="16" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" /></svg>
                        </div>
                        <div className="tableContent">
                            {playlistInfo?.data?.map((song, index) => <SongBox data={song} id={index} />
                            )}
                        </div>

                    </div>
                )}
                {playlistInfo && playlistInfo.data && playlistInfo.data.length == 0 && (
                    <p>No songs here<br />add some to listen</p>
                )}
            </div>
        </>
    )
}

function SongBox({ id, data }) {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);
    const buttonRef = useRef(null);
    let setNowPlaying = useContext(SongContext);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };


    let [userplaylist, setUserplaylist] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:5000/userplaylists`, {
            withCredentials: true
        })
            .then(function (response) {
                if (response.data) {
                    setUserplaylist(response);
                }
            }).catch(err => console.log(err))
    }, [])


    function addsongtoplaylist(id, name) {
        console.log(id);
        axios.post(`http://localhost:5000/addsongtoplaylist`,{
            name: name,
            songId: id
        }, {
            withCredentials: true
        })
            .then(function (response) {
                if (response.data) {
                    console.log(response.data)
                }
            }).catch(err => console.log(err))
    }

    function onMove(e) {
        for (const card of document.getElementsByClassName("songBox")) {
            const rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        };
    }
    return (
        <div className="songBox" onMouseMove={onMove} onClick={()=> {setNowPlaying.update(data._id)}}>
            <div className="song">
                <p>{id + 1}</p>
                <div>
                    <img src={data?.songImg} alt="" />
                    <div>
                        <p>{data?.name}</p>
                        <h4>{data?.singer}</h4>
                    </div>
                </div>
                <h3>{data?.album}</h3>
                <h4>{data?.genre}</h4>
                <svg onClick={handleButtonClick} ref={buttonRef} xmlns="http://www.w3.org/2000/svg" fill="#fff" height="16" width="16" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" /></svg>
                <h5>{data?.length}</h5>
            </div>
            {isOpen &&
                <div className="addsong" ref={popupRef}>
                    <h3>Add to playlist</h3>
                    {userplaylist?.data?.map((e) => <p key={e._id} onClick={()=>{addsongtoplaylist(data._id, e.name)}}>{e.name}</p>)}
                </div>
            }
        </div>
    )
}


function AddSongToPlaylist() {
    let [userplaylist, setUserplaylist] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:5000/userplaylists`, {
            withCredentials: true
        })
            .then(function (response) {
                if (response) {
                    setUserplaylist(response);
                }
            }).catch(err => console.log(err))
    }, [])
    return (
        <div className="addsong">
            <h3>Add to playlist</h3>
            {userplaylist.data?.map((e) => <p>{e.name}</p>)}
        </div>
    )
}