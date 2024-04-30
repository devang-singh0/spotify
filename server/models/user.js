import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});


export let User = new mongoose.model("User", userSchema);