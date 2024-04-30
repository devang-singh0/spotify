import express from "express";
export let foryouRouter = express.Router();
import { Song } from "../models/songs.js";
foryouRouter.get('/', async (req, res) => {
    const playlistSongs = await Song.aggregate([{ $sample: { size: 5 } }]);
    res.send(playlistSongs);
});



