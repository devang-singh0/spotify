import mongoose from 'mongoose';

const { Schema } = mongoose;

const playlistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  songs: [{
    type: [String],
  }]
});

export const Playlist = mongoose.model('Playlist', playlistSchema);

