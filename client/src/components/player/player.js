import "./player.scss"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import SongContext from "../../context/SongContext"
export default function Player() {
    let nowplaying = useContext(SongContext);
    let [data, setData] = useState();
    let [audioUrl, setAudioUrl] = useState();
    useEffect(() => {
        axios.get(`http://localhost:5000/play/${nowplaying.state}`, {
            withCredentials: true,
            responseType: 'json'
        })
            .then(function (response) {
                if (response.data) {
                    const { songInfo, file } = response.data;
                    setData(songInfo);
                    console.log(file);
                    // axios.get(`http://localhost:5000/${file}`, {
                    //     responseType: 'blob'
                    // })
                    //     .then(fileResponse => {
                    //         const url = URL.createObjectURL(fileResponse.data);
                    //         setAudioUrl(url);
                    //         console.log(audioUrl);
                    //     })
                }
            }).catch(err => console.log(err))

    }, [nowplaying.state])
    return (
        <div id="player">
            <div className="upper">
                <div className="one">
                    <img src={data?.data?.songImg} alt="" />
                    <div>
                        <p>{data?.data?.name}</p>
                        <h3>{data?.data?.singer}</h3>
                    </div>
                </div>
                <div className="two">
                    <svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" viewBox="0 0 512 512"><path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" viewBox="0 0 512 512"><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" viewBox="0 0 512 512"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" viewBox="0 0 24 24" id="loop"><path d="M16,12a1,1,0,0,1-.71-1.71L17.59,8,15.29,5.71a1,1,0,0,1,1.41-1.41l3,3a1,1,0,0,1,0,1.41l-3,3A1,1,0,0,1,16,12Z"></path><path d="M5 12a1 1 0 0 1-1-1V10A3 3 0 0 1 7 7H19a1 1 0 0 1 0 2H7a1 1 0 0 0-1 1v1A1 1 0 0 1 5 12zM8 20a1 1 0 0 1-.71-.29l-3-3a1 1 0 0 1 0-1.41l3-3a1 1 0 0 1 1.41 1.41L6.41 16l2.29 2.29A1 1 0 0 1 8 20z"></path><path d="M17,17H5a1,1,0,0,1,0-2H17a1,1,0,0,0,1-1V13a1,1,0,0,1,2,0v1A3,3,0,0,1,17,17Z"></path></svg>
                </div>
                <div className="three">
                    <svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" viewBox="0 0 92 92" id="speaker"><path d="M37.7 4.3c-1.5-.6-3.1-.3-4.3.9L13.7 25H4c-2.2 0-4 1.8-4 4v34c0 2.2 1.8 4 4 4h9.8l19.7 19.8c.8.8 1.8 1.2 2.8 1.2.5 0 .9-.1 1.4-.3 1.5-.6 2.3-2.1 2.3-3.7V8c0-1.6-.8-3.1-2.3-3.7zm-5.7 70L18.1 60.2c-.8-.8-1.6-1.2-2.7-1.2H8V33h7.4c1.1 0 1.9-.4 2.7-1.2L32 17.7v56.6zm21.2-11.4c-.8.9-1.9 1.3-3 1.3-.9 0-1.9-.3-2.7-1-1.6-1.5-1.8-4-.3-5.6 10-11.2 1-22 0-23.2-1.5-1.7-1.3-4.2.3-5.6 1.6-1.5 4.2-1.3 5.6.3 5.3 5.8 12.1 20.4.1 33.8zm12.1 10.7c-.8.9-1.9 1.3-3 1.3-.9 0-1.9-.3-2.7-1-1.6-1.5-1.8-4-.3-5.6 19.7-22.1.8-43.7 0-44.6-1.5-1.7-1.3-4.2.3-5.7s4.2-1.3 5.7.3c.2.3 24.4 28 0 55.3zm12.6 8.1c-.8.9-1.9 1.3-3 1.3-.9 0-1.9-.3-2.7-1-1.6-1.5-1.8-4-.3-5.6 11.2-12.6 14.7-26.6 10.2-41.5-3.4-11.4-10.1-19-10.2-19.1-1.5-1.6-1.3-4.2.3-5.6 1.6-1.5 4.2-1.3 5.7.3.3.2 31.5 35.9 0 71.2z"></path></svg>
                    <input type="range" defaultValue={33} max={100} />
                </div>
            </div>
            <div className="lower">
                <p>00:01</p>
                <input type="range" defaultValue={60} max={100} />
                <h3>{data?.data?.length}</h3>

            </div>
            <div className="musicVolumeWheel">

            </div>
        </div>
    )
}