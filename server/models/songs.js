import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  name: String,
  genre: String,
  singer: String,
  length: String,
  album: String,
  songImg: String
});


export let Song = new mongoose.model("Song", songSchema);