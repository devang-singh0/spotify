import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { playlistRouter } from './routes/playlist.js';
import { genreRouter, tileRouter, singerRouter } from './routes/extras.js';
import { foryouRouter } from './routes/forYou.js';
import { loginRouter } from './routes/login.js';
import { registerRouter } from './routes/register.js';
import { getUserRouter } from './routes/getUser.js';
import { addPlaylistRouter } from './routes/addPlaylist.js';
import { userPlaylistRouter } from './routes/userPlaylist.js';
import { addSongToPlaylistRouter } from './routes/addsongtoplaylist.js';
import { playRouter } from './routes/play.js';
const app = express();
const port = 5000;

// MongoDB Connection
mongoose.connect('mongodb://localhost/spotify')

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/playlist', playlistRouter);
app.use('/tile', tileRouter);
app.use('/genre', genreRouter);
app.use('/singer', singerRouter);
app.use('/for_user', foryouRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/getUser', getUserRouter);
app.use('/addPlaylist', addPlaylistRouter);
app.use('/userplaylists', userPlaylistRouter);
app.use('/addsongtoplaylist', addSongToPlaylistRouter);
app.use("/play", playRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});