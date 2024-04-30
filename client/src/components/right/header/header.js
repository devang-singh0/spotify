import { useEffect, useState } from "react";
import axios from "axios";
import "./header.scss"

export default function Header() {
    let [userData, setUserData] = useState();
    let [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:5000/getUser', {
            withCredentials: true
        })
            .then(function (response) {
                setUserData(response.data);
                setIsLoggedIn(true);
            }).catch(() => {
                
            })
    }, [])
    function expandSlider1() {
        let slider1 = document.querySelector(".rightTopNav .topProfile .slider1");
        let slider2 = document.querySelector(".rightTopNav .profile .slider2");
        if (slider2.classList.contains("openSlider2")) {
            return
        } else {
            slider1.classList.toggle("openSlider1");
            slider2.classList.toggle("slider1openslider2");
        }
    }
    function expandSlider2() {
        document.querySelector(".rightTopNav .profile .slider1").classList.toggle("slider2openslider1");
        document.querySelector(".rightTopNav .profile .slider2").classList.toggle("openSlider2");
    }
    return (
        <div className="rightTopNav">

            <div className="routes">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path fill="#ffffff" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path fill="#ffffff" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
                </div>
            </div>
            <div className="profile">
                <div className="topProfile">
                    <div className="slider1" onClick={expandSlider2}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" fill="rgba(255, 255, 255, 0.8)" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg>
                        <p>Profile</p>
                    </div>
                    <img src="https://picsum.photos/id/237/200/200" alt="" onClick={expandSlider1} />
                </div>
                <div className="slider2">
                    <p>{userData?.email}</p>
                    <div className="logBtn">
                    {isLoggedIn ? <button className="btn"><a href="/logout">Log Out</a></button> : <button className="btn"><a href="login">Log In</a></button>}
                    </div>
                </div>
            </div>
        </div>
    )
}


