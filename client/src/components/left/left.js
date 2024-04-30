import { useState, useEffect } from "react"
import "./left.scss"
import axios from "axios";
export default function Left() {
    let [isAddPlaylist, setIsAddPlaylist] = useState(false);
    let [userplaylist, setUserplaylist] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:5000/userplaylists`, {
            withCredentials: true
        })
            .then(function (response) {
                if (response.data) {
                    setUserplaylist(response);
                    console.log(response.data);
                }
            }).catch(err => console.log(err))
    }, [])
    return (
        <div id="left">
            <nav>
                <div className="navItem active">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 576 512"><path fill="#fff" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" /></svg>
                    <p>Home</p>
                </div>
                <div className="navItem">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                    <p>Search</p>
                </div>
                <hr />
                <div className="navItem library">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 576 512"><path fill="#ffffff" d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z" /></svg>
                    <p>Your library</p>
                </div>
            </nav>

            <div onClick={() => { setIsAddPlaylist(!isAddPlaylist) }} className="addPlaylist">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path fill="#ffffff" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                <p>Add new playlist</p>
            </div>
            {isAddPlaylist && <NewPlaylistPopup />}
            <div className="playlists">
                {userplaylist?.data?.map((e) => <Playlist data={e}></Playlist>)}
            </div>
        </div>
    )
}

function Playlist({ data }) {
    return (
        <a href={`/playlist/user/${data.createdBy}/${data?.name}`}>
            <div className="playlist likedSongs">
                <div className="playlistIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path fill="#ffffff" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 32a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm-96-32a96 96 0 1 0 192 0 96 96 0 1 0 -192 0zM96 240c0-35 17.5-71.1 45.2-98.8S205 96 240 96c8.8 0 16-7.2 16-16s-7.2-16-16-16c-45.4 0-89.2 22.3-121.5 54.5S64 194.6 64 240c0 8.8 7.2 16 16 16s16-7.2 16-16z" /></svg>
                </div>
                <div className="playlistInfo">
                    <p>{data.name}</p>
                    <h4>{data.songs.length} songs</h4>
                </div>
            </div>
        </a>
    )
}

function NewPlaylistPopup() {
    let [playlistName, setPlaylistName] = useState();
    function addPlaylist() {
        axios.post('http://localhost:5000/addPlaylist', {
            playlistName: playlistName
        }, {
            withCredentials: true
        })
            .then(function (response) {
                if (response.data) {
                    alert("playlist created");
                } else {
                    alert("please login to create a playlist");
                }
            }).catch(() => {
                alert("404 not found");
            })
    }
    return (
        <>

            <div className="popup">
                <input type="text" placeholder="Playlist name" onChange={(e) => { setPlaylistName(e.target.value) }} />
                <button onClick={addPlaylist}><svg xmlns="http://www.w3.org/2000/svg" height={15} width={15} viewBox="0 0 448 512" fill="#fff"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg></button>
            </div>
        </>
    )
}
