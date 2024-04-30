import express from "express";
export let tileRouter = express.Router();
export let genreRouter = express.Router();
export let singerRouter = express.Router();
import { Singer, Tile, Genre } from '../models/extras.js';
tileRouter.get('/', async (req, res) => {
    const tiles = await Tile.find();
    res.send(tiles);
});
singerRouter.get('/', async (req, res) => {
    const tiles = await Singer.find();
    res.send(tiles);
});
genreRouter.get('/', async (req, res) => {
    const tiles = await Genre.find();
    res.send(tiles);
});