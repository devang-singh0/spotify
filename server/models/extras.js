import mongoose from "mongoose";
const tileSchema = new mongoose.Schema({
    name: String,
    img: String
});

export let Tile = new mongoose.model("Tile", tileSchema);

const genreSchema = new mongoose.Schema({
    name: String,
    img: String
});


export let Genre = new mongoose.model("Genre", genreSchema);

const singerSchema = new mongoose.Schema({
    name: String,
    songs: Number,
    img: String
});


export let Singer = new mongoose.model("Singer", singerSchema);


