import express from "express";
export let playlistRouter = express.Router();
import { Song } from "../models/songs.js";
import { Playlist } from "../models/playlist.js";
import { checkToken } from "../service/auth.js";
playlistRouter.get('/tile/spotify/:name', async (req, res) => {
    const randomNumber = Math.floor(Math.random() * (13 - 8 + 1)) + 8;
    const playlistSongs = await Song.aggregate([{ $sample: { size: randomNumber } }]);
    res.send({ type: "Playlist", name: req.params.name, user: "Spotify", number: randomNumber, data: playlistSongs });
});

playlistRouter.get('/genre/spotify/:name', async (req, res) => {
    const playlistSongs = await Song.find({ genre: req.params.name });
    res.send({ type: "Playlist", name: req.params.name, user: "Spotify", number: playlistSongs.length, data: playlistSongs });
});

playlistRouter.get('/singer/spotify/:name', async (req, res) => {
    const playlistSongs = await Song.find({ singer: { $regex: req.params.name, $options: "i" } });

    res.send({ type: "Playlist", name: req.params.name, user: "Spotify", number: playlistSongs.length, data: playlistSongs });
});

// playlistRouter.get('/user/:username/:playlist', async (req, res) => {
//     try {
//         let verifyUser = checkToken(req.headers.cookie?.slice(4));
//         if (verifyUser) {
//             let data = await Playlist.findOne({name: req.params.playlist, createdBy: req.params.username})
//             let playlistSongs;
//             data?.songs?.forEach(async (e)=>{
//                 let song = await Song.findById(e);
//                 console.log(song);
//             })
//             res.send({ type: "Playlist", name: req.params.playlist, user: req.params.username, number: playlistSongs?.length, data: playlistSongs });
//         }
//         else {
//             res.send(false);
//         }
//     } catch (error) {
//         console.error("Internal server error", error);
//         res.status(500).send('Internal server error');
//     }
// });


playlistRouter.get('/user/:username/:playlist', async (req, res) => {
    try {
        let verifyUser = checkToken(req.headers.cookie?.slice(4));
        if (verifyUser) {
            let data = await Playlist.findOne({ name: req.params.playlist, createdBy: req.params.username });
            let playlistSongs = [];

            if (data && data.songs) {
                // Use Promise.all() to wait for all asynchronous operations to complete
                await Promise.all(data.songs.map(async (e) => {
                    let song = await Song.findById(e);
                    playlistSongs.push(song);
                }));
            }

            res.send({ type: "Playlist", name: req.params.playlist, user: req.params.username, number: playlistSongs.length, data: playlistSongs });
        } else {
            res.send(false);
        }
    } catch (error) {
        console.error("Internal server error", error);
        res.status(500).send('Internal server error');
    }
});
