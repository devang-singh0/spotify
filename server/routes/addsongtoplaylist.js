import express from "express";
export let addSongToPlaylistRouter = express.Router();
import { Playlist } from "../models/playlist.js";
import { checkToken } from "../service/auth.js";
addSongToPlaylistRouter.post('/', async (req, res) => {
    try {
        let verifyUser = checkToken(req.headers.cookie?.slice(4));
        if (verifyUser) {
            const playlist = await Playlist.findOne({ name: req.body.name, createdBy: verifyUser?.email });
            if (playlist) {
                playlist?.songs?.push(req.body.songId);
                await playlist?.save();
                res.send(true);
            } else {
                res.send(false);
            }
        }
        else {
            res.send(false);
        }
    } catch (error) {
        console.error("Internal server error", error);
        res.status(500).send('Internal server error');
    }
});