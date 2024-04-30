import { checkToken } from "../service/auth.js";
import { Playlist } from "../models/playlist.js";
import express from "express";
export let addPlaylistRouter = express.Router();

addPlaylistRouter.post('/', async (req, res) => {
    try {
        let verifyUser = checkToken(req.headers.cookie?.slice(4));
        if (verifyUser) {
            let playlist = new Playlist({ name: req.body.playlistName, createdBy: verifyUser.email });
            await playlist.save();
            res.send(true);
        }
        else {
            res.send(false);
        }
    } catch (error) {
        console.error("Internal server error", error);
        res.status(500).send('Internal server error');
    }
});