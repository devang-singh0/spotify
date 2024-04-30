import "./right.scss"
import Tile from "./home/tile/tile"
import Singers from "./home/singers/singers"
import Genre from "./home/genre/genre"
import Scard from "./home/song-card/scard"
import Header from "./header/header"
import Footer from "./footer/footer"
import Register from "./register/register"
import Login from "./login/login"
import axios from "axios"
import Playlist from "./playlist/playlist"
import Search from "./search/search"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Right() {
    return (
        <div id="right">
            <Header></Header>
            <Router>
                <Routes>
                    <Route path="/" Component={Home} />
                    <Route path="/search" Component={Search} />
                    <Route path="/playlist/:type/:name/:playlist" Component={Playlist} />
                    <Route path="/Login" Component={Login} />
                    <Route path="/Register" Component={Register} />
                    <Route path="/logout" Component={Logout} />
                </Routes>
            </Router>
            <Footer></Footer>
        </div>
    )
}



function Logout() {
    let navigate = useNavigate();
    useEffect(() => {
        document.cookie = 'uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        console.log('Cookie deleted');
        navigate(`/`);
        window.location.reload();
    }, [])
    return
}
function Home() {
    let [data, setData] = useState({});
    useEffect(() => {
        let tileData = axios.get('http://localhost:5000/tile')
        let genreData = axios.get('http://localhost:5000/genre')
        let singerData = axios.get('http://localhost:5000/singer')
        let forYou = axios.get("http://localhost:5000/for_user")
        Promise.all([tileData, genreData, singerData, forYou])
            .then(([result1, result2, result3, result4]) => {
                setData({ tile: result1?.data, genre: result2?.data, singer: result3?.data, forYou: result4?.data });
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });
    }, [])
    return (
        <>
            <section className="sections">
                <h2 className="sectionTitle">Good evening</h2>
                <div className="sectionItems">
                    {data.tile?.map((song) => <Tile data={song} />)}
                </div>
            </section>
            <section className="sections first">
                <h2 className="sectionTitle">Top categories</h2>
                <div className="sectionItems">
                    {data.genre?.map((song) => <Genre data={song} />)}
                </div>
            </section>

            <section className="sections second">
                <h2 className="sectionTitle">Top Singers</h2>
                <div className="sectionItems">
                    {data.singer?.slice(0, 5).map((song) => <Singers data={song} />)}
                </div>
            </section>


            <section className="sections third">
                <h2 className="sectionTitle">For adorable you</h2>
                <div className="sectionItems">
                    {data.forYou?.map((song) => <Scard data={song} />)}
                </div>
            </section>
        </>
    )
}