import express from "express";
export let userPlaylistRouter = express.Router();
import { Playlist } from "../models/playlist.js";
import { checkToken } from "../service/auth.js";
userPlaylistRouter.get('/', async (req, res) => {
    try {
        let verifyUser = checkToken(req.headers.cookie?.slice(4));
        if (verifyUser) {
            let playlists = await Playlist.find({createdBy: verifyUser.email});
            res.send(playlists);
        }
        else {
            res.send(false);
        }
    } catch (error) {
        console.error("Internal server error", error);
        res.status(500).send('Internal server error');
    }
});