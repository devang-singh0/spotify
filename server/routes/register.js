import { User } from "../models/user.js";
import { setToken } from "../service/auth.js";
import express from "express";
export let registerRouter = express.Router();

registerRouter.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.send({ status: false });
        }
        const newUser = new User({ email: req.body.email, password: req.body.password });
        await newUser.save();

        const token = setToken({ email: req.body.email, password: req.body.password });
        res.cookie('uid', token, {
            httpOnly: false, // Ensure it's accessible by client-side JavaScript
            secure: false, // Allow it to be sent over HTTP
            domain: 'localhost' // Set the domain to localhost
        });
        res.send({ status: true });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send('Internal server error');
    }
});
