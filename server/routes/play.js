import express from "express";
import { Song } from "../models/songs.js";
export let playRouter = express.Router();
playRouter.get('/:id', async (req, res) => {
    try {
        let songInfo = await Song.findById(req.params.id);
        let cwd = process.cwd()
        const file = `songfiles/song.mp3`;

        if (songInfo) {
            res.send({ songInfo, file });
        } else {
            res.send(false);
            console.log(file);
        }
    } catch (error) {
        console.error("Internal server error", error);
        res.status(500).send('Internal server error');
    }
});



